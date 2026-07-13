"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { ShoppingBag, CreditCard } from "lucide-react";

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: user?.name || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="container-tight section-padding">
        <div className="text-center py-20">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Please login to checkout
          </h1>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-tight section-padding">
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before checking out.
          </p>
          <Button asChild>
            <a href="/explore">Start Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    for (const [key, value] of Object.entries(shippingAddress)) {
      if (!value.trim()) {
        toast.error(`Please fill in the ${key} field`);
        return;
      }
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const orderItems = items.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress,
        }),
      });

      const json = await res.json();

      if (json.success) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push("/orders");
      } else {
        toast.error(json.message || "Failed to place order");
      }
    } catch {
      toast.error("Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container-tight section-padding">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 rounded-xl border bg-background">
              <h2 className="text-lg font-heading font-bold text-foreground mb-4">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Full Name
                  </label>
                  <Input
                    value={shippingAddress.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Address
                  </label>
                  <Input
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    City
                  </label>
                  <Input
                    value={shippingAddress.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    State
                  </label>
                  <Input
                    value={shippingAddress.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    ZIP Code
                  </label>
                  <Input
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="10001"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Country
                  </label>
                  <Input
                    value={shippingAddress.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="USA"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isProcessing}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-xl border bg-background sticky top-24">
            <h2 className="text-lg font-heading font-bold text-foreground mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.product.title} x{item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-secondary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
