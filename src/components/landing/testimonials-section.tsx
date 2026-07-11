import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real stories from people who brought handmade art into their lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border bg-background shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${
                      j < testimonial.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
