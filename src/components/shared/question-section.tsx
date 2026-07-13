"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import type { Question } from "@/types";

interface QuestionSectionProps {
  productId: string;
}

export function QuestionSection({ productId }: QuestionSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [productId]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`/api/products/${productId}/questions`);
      const json = await res.json();
      if (json.success) {
        setQuestions(json.data);
      }
    } catch {
      console.error("Failed to fetch questions");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to ask a question");
      return;
    }

    if (!newQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/${productId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: newQuestion.trim() }),
      });

      const json = await res.json();

      if (json.success) {
        setQuestions([json.data, ...questions]);
        setNewQuestion("");
        toast.success("Question submitted successfully");
      } else {
        toast.error(json.message || "Failed to submit question");
      }
    } catch {
      toast.error("Failed to submit question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-secondary" />
        <h2 className="text-2xl font-heading font-bold text-secondary">
          Questions ({questions.length})
        </h2>
      </div>

      {/* Ask a Question Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a question about this product..."
            className="mb-3"
            rows={3}
          />
          <Button type="submit" disabled={isSubmitting || !newQuestion.trim()}>
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Ask Question"}
          </Button>
        </form>
      ) : (
        <div className="p-4 rounded-xl border bg-muted/30 mb-8">
          <p className="text-sm text-muted-foreground">
            Please{" "}
            <a href="/login" className="text-primary underline">
              login
            </a>{" "}
            to ask a question about this product.
          </p>
        </div>
      )}

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="text-center py-8 rounded-xl border bg-muted/30">
          <p className="text-muted-foreground">
            No questions yet. Be the first to ask!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q._id} className="p-5 rounded-xl border bg-background">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm">
                    {q.userName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(q.createdAt)}
                  </span>
                </div>
                <p className="text-foreground">{q.question}</p>
              </div>

              {q.answer && (
                <div className="ml-6 p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
                  <p className="text-xs text-muted-foreground mb-1">
                    Artisan Answer
                  </p>
                  <p className="text-sm text-foreground">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
