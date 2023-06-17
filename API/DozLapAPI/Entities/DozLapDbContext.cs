using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DozLapAPI.Entities;

public partial class DozLapDbContext : DbContext
{
    public DozLapDbContext()
    {
    }

    public DozLapDbContext(DbContextOptions<DozLapDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<BuildVersion> BuildVersions { get; set; }

    public virtual DbSet<CreditCard> CreditCards { get; set; }

    public virtual DbSet<CreditCardType> CreditCardTypes { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<DiscountAppliedCategory> DiscountAppliedCategories { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    public virtual DbSet<ShipmentMethod> ShipmentMethods { get; set; }

    public virtual DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_address");

            entity.ToTable("address");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.HouseNumber)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("house_number");
            entity.Property(e => e.ProvinceId).HasColumnName("province_id");
            entity.Property(e => e.Street)
                .HasMaxLength(1000)
                .HasColumnName("street");

            entity.HasOne(d => d.Province).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.ProvinceId)
                .HasConstraintName("fk_address_province");
        });

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_admin");

            entity.ToTable("admin");

            entity.HasIndex(e => e.Password, "UQ__admin__6E2DBEDE1D2BBC06").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__admin__F3DBC57254133B72").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Password)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<BuildVersion>(entity =>
        {
            entity.HasKey(e => e.Clo).HasName("PK__BuildVer__35E58ECAC931EFFB");

            entity.ToTable("BuildVersion");

            entity.Property(e => e.Clo)
                .ValueGeneratedOnAdd()
                .HasColumnName("clo");
            entity.Property(e => e.DatabaseVersion)
                .HasMaxLength(25)
                .HasColumnName("Database Version");
            entity.Property(e => e.ModifiedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.VersionDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CreditCard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_card");

            entity.ToTable("credit_card");

            entity.HasIndex(e => e.AccountNumber, "UQ__credit_c__AF91A6ADB7CEAA24").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__credit_c__F3DBC57206679CFF").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.AccountNumber)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("account_number");
            entity.Property(e => e.Balance)
                .HasColumnType("money")
                .HasColumnName("balance");
            entity.Property(e => e.CardTypeId).HasColumnName("card_type_id");
            entity.Property(e => e.CsvNumber)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("csv_number");
            entity.Property(e => e.ExpireOnUtc)
                .HasColumnType("datetime")
                .HasColumnName("expire_on_utc");
            entity.Property(e => e.Username)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<CreditCardType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_card_type");

            entity.ToTable("credit_card_type");

            entity.HasIndex(e => e.Name, "UQ__credit_c__72E12F1B326889BA").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Charge)
                .HasColumnType("money")
                .HasColumnName("charge");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_customer");

            entity.ToTable("customer");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CardId).HasColumnName("card_id");
            entity.Property(e => e.DateOfBirth)
                .HasColumnType("datetime")
                .HasColumnName("date_of_birth");
            entity.Property(e => e.Email)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(1000)
                .HasColumnName("first_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.LastName)
                .HasMaxLength(1000)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("phone_number");
            entity.Property(e => e.Username)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Card).WithMany(p => p.Customers)
                .HasForeignKey(d => d.CardId)
                .HasConstraintName("fk_customer_card");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_discount");

            entity.ToTable("discount");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.DiscountPercentage).HasColumnName("discount_percentage");
            entity.Property(e => e.EndDateUtc)
                .HasColumnType("datetime")
                .HasColumnName("end_date_utc");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
            entity.Property(e => e.StartDateUtc)
                .HasColumnType("datetime")
                .HasColumnName("start_date_utc");
        });

        modelBuilder.Entity<DiscountAppliedCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_discount_applied_category");

            entity.ToTable("discount_applied_category");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.DiscountId).HasColumnName("discount_id");

            entity.HasOne(d => d.Category).WithMany(p => p.DiscountAppliedCategories)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("fk_category_applied");

            entity.HasOne(d => d.Discount).WithMany(p => p.DiscountAppliedCategories)
                .HasForeignKey(d => d.DiscountId)
                .HasConstraintName("fk_discount_applied");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_order");

            entity.ToTable("orders");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedOnUtc)
                .HasColumnType("datetime")
                .HasColumnName("created_on_utc");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.IsPaid).HasColumnName("is_paid");
            entity.Property(e => e.Note)
                .HasMaxLength(1000)
                .HasColumnName("note");
            entity.Property(e => e.PaymentMethodId).HasColumnName("payment_method_id");
            entity.Property(e => e.ShippingAddressId).HasColumnName("shipping_address_id");
            entity.Property(e => e.ShippingMethodId).HasColumnName("shipping_method_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("money")
                .HasColumnName("total_price");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("fk_order_customer");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentMethodId)
                .HasConstraintName("fk_order_payment_method");

            entity.HasOne(d => d.ShippingAddress).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShippingAddressId)
                .HasConstraintName("fk_order_shipping_addresses");

            entity.HasOne(d => d.ShippingMethod).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShippingMethodId)
                .HasConstraintName("fk_order_shipping_method");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_item");

            entity.ToTable("order_item");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasMaxLength(1000)
                .HasColumnName("comment");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Rate).HasColumnName("rate");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("fk_item_order");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("fk_item_product");
        });

        modelBuilder.Entity<PaymentMethod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_payment_method");

            entity.ToTable("payment_method");

            entity.HasIndex(e => e.Name, "UQ__payment___72E12F1B6DC2782D").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_product");

            entity.ToTable("product");

            entity.HasIndex(e => e.Name, "UQ__product__72E12F1BD9520DE6").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("image_url");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.Specs)
                .HasMaxLength(4000)
                .HasColumnName("specs");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("fk_product_category");
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_category");

            entity.ToTable("product_category");

            entity.HasIndex(e => e.Name, "UQ__product___72E12F1BE1264A35").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Province>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_province");

            entity.ToTable("province");

            entity.HasIndex(e => e.Name, "UQ__province__72E12F1B52C8E35D").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
            entity.Property(e => e.ShippingCharge)
                .HasColumnType("money")
                .HasColumnName("shipping_charge");
        });

        modelBuilder.Entity<ShipmentMethod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_shipment_method");

            entity.ToTable("shipment_method");

            entity.HasIndex(e => e.Name, "UQ__shipment__72E12F1B3A3B726A").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .HasColumnName("name");
            entity.Property(e => e.ShipCharge)
                .HasColumnType("money")
                .HasColumnName("ship_charge");
        });

        modelBuilder.Entity<ShoppingCartItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_cart_item");

            entity.ToTable("shopping_cart_item");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedOnUtc)
                .HasColumnType("datetime")
                .HasColumnName("created_on_utc");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Customer).WithMany(p => p.ShoppingCartItems)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("fk_cart_customer");

            entity.HasOne(d => d.Product).WithMany(p => p.ShoppingCartItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("fk_cart_product");
        });
        modelBuilder.HasSequence<int>("SalesOrderNumber", "SalesLT");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
