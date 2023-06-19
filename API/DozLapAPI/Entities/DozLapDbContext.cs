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

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    public virtual DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=dozlapsoutheastasia.database.windows.net, 1433;Initial Catalog=DozLapPTTKDB;Persist Security Info=True;User ID=sqladmin;Password=CodingProject123@");

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

            entity.HasIndex(e => e.Password, "UQ__admin__6E2DBEDE992C0F19").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__admin__F3DBC572A6354A78").IsUnique();

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

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_customer");

            entity.ToTable("customer");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.AddressId).HasColumnName("address_id");
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

            entity.HasOne(d => d.Address).WithMany(p => p.Customers)
                .HasForeignKey(d => d.AddressId)
                .HasConstraintName("fk_customer_address");
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
            entity.Property(e => e.ShippingAddressId).HasColumnName("shipping_address_id");
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

            entity.HasOne(d => d.ShippingAddress).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShippingAddressId)
                .HasConstraintName("fk_order_shipping_addresses");
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

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_product");

            entity.ToTable("product");

            entity.HasIndex(e => e.Name, "UQ__product__72E12F1B53F713E0").IsUnique();

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

            entity.HasIndex(e => e.Name, "UQ__product___72E12F1BF64304D9").IsUnique();

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

            entity.HasIndex(e => e.Name, "UQ__province__72E12F1BA8C5DD33").IsUnique();

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

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
