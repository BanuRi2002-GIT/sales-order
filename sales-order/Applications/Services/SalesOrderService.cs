using AutoMapper;
using MongoDB.Bson;
using SalesOrderApi.API.Models;
using SalesOrderApi.Application.Interfaces;
using SalesOrderApi.Domain.Entities;

namespace SalesOrderApi.Application.Services;

public class SalesOrderService : ISalesOrderService
{
    private readonly ISalesOrderRepository _repository;
    private readonly IMapper _mapper;

    public SalesOrderService(ISalesOrderRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<List<SalesOrderListItemDto>> GetAllAsync()
    {
        var orders = await _repository.GetAllAsync();
        return _mapper.Map<List<SalesOrderListItemDto>>(orders);
    }

    public async Task<SalesOrderDetailDto?> GetByIdAsync(string id)
    {
        var order = await _repository.GetByIdAsync(id);
        return order is null ? null : _mapper.Map<SalesOrderDetailDto>(order);
    }

    public async Task<SalesOrderDetailDto> CreateAsync(SalesOrderInputDto input)
    {
        var order = BuildOrderFromInput(input);
        order.OrderId = ObjectId.GenerateNewId().ToString();

        await _repository.CreateAsync(order);
        return _mapper.Map<SalesOrderDetailDto>(order);
    }

    public async Task<SalesOrderDetailDto?> UpdateAsync(string id, SalesOrderInputDto input)
    {
        var order = BuildOrderFromInput(input);
        order.OrderId = id;

        var updated = await _repository.UpdateAsync(id, order);
        return updated ? _mapper.Map<SalesOrderDetailDto>(order) : null;
    }

    // --- Business logic: builds line + order totals, always recalculated server-side ---
    private static SalesOrder BuildOrderFromInput(SalesOrderInputDto input)
    {
        var lines = input.Lines.Select(BuildLine).ToList();

        var order = new SalesOrder
        {
            CustomerId = input.CustomerId,
            CustomerName = input.CustomerName,
            Address1 = input.Address1,
            Address2 = input.Address2,
            Address3 = input.Address3,
            City = input.City,
            State = input.State,
            PostCode = input.PostCode,
            InvoiceNo = input.InvoiceNo,
            InvoiceDate = input.InvoiceDate,
            ReferenceNo = input.ReferenceNo,
            Lines = lines,
            TotalExcl = Round2(lines.Sum(l => l.ExclAmount)),
            TotalTax = Round2(lines.Sum(l => l.TaxAmount)),
            TotalIncl = Round2(lines.Sum(l => l.InclAmount)),
        };

        return order;
    }

    private static SalesOrderLine BuildLine(SalesOrderLineInputDto input)
    {
        // Excl Amount = Quantity * Price
        var exclAmount = Round2(input.Quantity * input.Price);

        // Tax Amount = Excl Amount * Tax Rate / 100
        var taxAmount = Round2(exclAmount * input.TaxRate / 100m);

        // Incl Amount = Excl Amount + Tax Amount
        var inclAmount = Round2(exclAmount + taxAmount);

        return new SalesOrderLine
        {
            ItemCode = input.ItemCode,
            Description = input.Description,
            Note = input.Note,
            Quantity = input.Quantity,
            Price = input.Price,
            TaxRate = input.TaxRate,
            ExclAmount = exclAmount,
            TaxAmount = taxAmount,
            InclAmount = inclAmount,
        };
    }

    private static decimal Round2(decimal value) => Math.Round(value, 2, MidpointRounding.AwayFromZero);
}
