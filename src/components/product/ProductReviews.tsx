"use client";

import React, { useState } from "react";
import { Star, User, Calendar, MessageSquare, Plus, ShieldCheck, LogIn } from "lucide-react";
import Button from "@/components/ui/Button";
import { useSession, signIn } from "next-auth/react";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    name: string;
  };
};

export default function ProductReviews({ 
  productId, 
  slug, 
  initialReviews, 
  averageRating, 
  reviewCount 
}: { 
  productId: string;
  slug: string;
  initialReviews: Review[];
  averageRating: number;
  reviewCount: number;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!session?.user) {
        signIn();
        return;
      }

      const res = await fetch(`/api/products/${slug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, userId: (session.user as any).id })
      });

      if (res.ok) {
        const newReview = await res.json();
        // Since the API returns user: { name } we might need to mock it if DB relation isn't perfect yet
        setReviews([{ 
          ...newReview, 
          user: { name: "You" } 
        }, ...reviews]);
        setShowForm(false);
        setComment("");
        setRating(5);
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold text-secondary mb-2 uppercase tracking-tight">Customer Reviews</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < Math.floor(averageRating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-lg font-bold text-secondary">{averageRating} out of 5</span>
            <span className="text-gray-400">({reviewCount} verified reviews)</span>
          </div>
        </div>
        
        {!showForm && (
          session ? (
            <Button 
              variant="gold" 
              className="group px-8 uppercase text-xs font-bold tracking-widest"
              onClick={() => setShowForm(true)}
            >
              <Plus size={18} className="mr-2" />
              Write a Review
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="group px-8 uppercase text-[10px] font-bold tracking-widest border-gray-200"
              onClick={() => signIn()}
            >
              <LogIn size={16} className="mr-2" />
              Log in to review
            </Button>
          )
        )}
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-secondary uppercase tracking-widest text-sm">Submit your experience</h4>
            <button onClick={() => setShowForm(false)} className="text-xs font-bold text-gray-400 hover:text-primary">Cancel</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rate the craftsmanship</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`transition-all ${rating >= star ? "text-primary scael-110" : "text-gray-200"}`}
                  >
                    <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share your thoughts</label>
              <textarea
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all text-sm min-h-[120px]"
                placeholder="What did you love about this piece?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              variant="gold" 
              className="w-full py-5 font-bold uppercase tracking-widest"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Post Review"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] space-y-4 hover:shadow-xl transition-all duration-500 group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary group-hover:text-primary transition-colors">{review.user.name}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5 text-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-green-50 text-green-600">
                  <ShieldCheck size={16} />
                </div>
              </div>
              
              <div className="flex gap-4">
                <MessageSquare className="text-gray-100 flex-shrink-0" size={24} />
                <p className="text-gray-600 leading-relaxed text-sm">
                  {review.comment || "No comment provided."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Be the first to share your experience with this piece.</p>
          </div>
        )}
      </div>
    </div>
  );
}
