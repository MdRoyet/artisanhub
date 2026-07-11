"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock, Loader2 } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@artisanhub.com",
    href: "mailto:hello@artisanhub.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (123) 456-7890",
    href: "tel:+11234567890",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Artisan Lane, Craftsville, USA",
    href: null,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    href: null,
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const newErrors: Record<string, string> = {};
    if (!data.name || data.name.length < 2) newErrors.name = "Name is required";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
      newErrors.email = "Please enter a valid email";
    if (!data.subject || data.subject.length < 3)
      newErrors.subject = "Subject is required";
    if (!data.message || data.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast.success("Message sent!", {
      description: "We will get back to you within 24 hours.",
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="section-padding">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question about an order, want to partner with us, or just
            want to say hello? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Contact Information
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fill out the form and our team will get back to you within 24
              hours. For urgent inquiries, you can reach us directly by phone.
            </p>

            <div className="space-y-4 pt-2">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl border bg-background space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-16" />

        {/* FAQ Teaser */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Looking for quick answers? Check out our FAQ section.
          </p>
          <Button variant="outline" asChild>
            <a href="/#faq">View FAQ</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
