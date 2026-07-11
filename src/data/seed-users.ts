// src/data/seed-users.ts

export const users = [
  {
    name: "Priya Sharma",
    email: "artisan@demo.com",
    password: "demo1234",
    role: "user" as const,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Admin User",
    email: "admin@artisanhub.com",
    password: "admin1234",
    role: "admin" as const,
    avatar: "",
  },
  {
    name: "Marco Bellini",
    email: "marco@demo.com",
    password: "demo1234",
    role: "user" as const,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Yuki Tanaka",
    email: "yuki@demo.com",
    password: "demo1234",
    role: "user" as const,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];
