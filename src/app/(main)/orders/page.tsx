"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package, ShoppingBag } from "lucide-react";
import type { Order, OrderStatus } from "@/types";
import { OrdersSkeleton } from "@/components/shared/skeletons";

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container-tight section-padding">
        <div className="text-center py-20">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Please login to view your orders
          </h1>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="container-tight section-padding">
        <div className="text-center py-20">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            No orders yet
          </h1>
          <p className="text-muted-foreground mb-8">
            Start shopping to see your orders here.
          </p>
          <Button asChild>
            <Link href="/explore">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-tight section-padding">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">
        My Orders ({orders.length})
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 rounded-xl border bg-background"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <div className="text-right">
                <Badge className={statusColors[order.status]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product}`}
                      className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Shipping to: {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}
              </span>
              <span className="font-bold text-secondary">
                Total: {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
