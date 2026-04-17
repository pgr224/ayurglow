"use client"

import React, { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PRODUCT_TYPES, SKIN_TYPES, CONCERNS, INGREDIENTS } from '@/lib/categories'
import { Check, ChevronDown, X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentType = searchParams.get('type') || 'all'
  const currentSkinType = searchParams.get('skinType')
  const currentConcern = searchParams.get('concern')
  const currentIngredient = searchParams.get('ingredient')

  // Helper to update URL search params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (name: string, value: string) => {
    // If clicking the currently selected value, toggle it off (except for 'type' which falls back to 'all')
    const currentValue = searchParams.get(name)
    const newValue = currentValue === value ? (name === 'type' ? 'all' : '') : value
    
    router.push(`/products?${createQueryString(name, newValue)}`)
  }

  const clearAllFilters = () => {
    router.push('/products')
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (currentSkinType) count++
    if (currentConcern) count++
    if (currentIngredient) count++
    return count
  }, [currentSkinType, currentConcern, currentIngredient])

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Product Type Tabs (Foxtale style) - Scrollable horizontally */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-2 pb-2 min-w-max">
          {PRODUCT_TYPES.map((type) => {
            const isActive = currentType === type.id
            return (
              <button
                key={type.id}
                onClick={() => handleFilterChange('type', type.id === 'all' ? '' : type.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white border border-border text-muted-foreground hover:border-primary hover:text-foreground shadow-sm"
                )}
              >
                {type.icon && <span>{type.icon}</span>}
                {type.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Side/Top Filters for finer details (Dr. Sheth's style) */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            Refine By
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeFiltersCount}
              </Badge>
            )}
          </h2>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-xs font-bold text-muted-foreground hover:text-red-600 h-auto p-0 uppercase tracking-widest"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Accordions for finer details */}
        <div className="flex flex-col">
          <Accordion multiple defaultValue={["skin-type", "concern", "ingredients"]} className="w-full">
            <AccordionItem value="skin-type" className="border-b">
              <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-xs font-black uppercase tracking-widest italic">Skin Type</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {SKIN_TYPES.map((st) => (
                    <label key={st.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        currentSkinType === st.id ? "bg-primary border-primary" : "border-input group-hover:border-primary"
                      )}>
                        {currentSkinType === st.id && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className={cn(
                        "text-[13px] font-medium transition-colors",
                        currentSkinType === st.id ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        {st.icon} {st.label}
                      </span>
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={currentSkinType === st.id}
                        onChange={() => handleFilterChange('skinType', st.id)}
                      />
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="concern" className="border-b">
              <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-xs font-black uppercase tracking-widest italic">Concern</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-wrap gap-2">
                  {CONCERNS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleFilterChange('concern', c.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border",
                        currentConcern === c.id 
                          ? cn("border-transparent shadow-sm", c.color || "bg-primary text-primary-foreground")
                          : "bg-white border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      )}
                    >
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ingredients" className="border-b-0">
              <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-xs font-black uppercase tracking-widest italic">Key Ingredients</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-wrap gap-2">
                  {INGREDIENTS.map((ing) => (
                    <button
                      key={ing.id}
                      onClick={() => handleFilterChange('ingredient', ing.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border",
                        currentIngredient === ing.id 
                          ? cn("border-transparent shadow-sm", ing.color || "bg-primary text-primary-foreground")
                          : "bg-white border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      )}
                    >
                      {ing.icon} {ing.label}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
