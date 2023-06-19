using AutoMapper;
using DozLapAPI.Entities;
using DozLapAPI.Models;

namespace DozLapAPI.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() 
        { 
            CreateMap<ShoppingCartItem, ShoppingCartItemDTO>().ReverseMap();
            CreateMap<Customer, CustomerDTO>().ReverseMap();
            CreateMap<Province, ProvinceDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();
            CreateMap<ProductCategory, ProductCategoryDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Address, AddressDTO>().ReverseMap();
        }
    }
}
