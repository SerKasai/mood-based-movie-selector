"use client";

import * as React from "react";
import { motion, isMotionComponent, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

// --- TIPI NECESSARI ---
type AnyProps = Record<string, any>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<any>,
  "ref"
> & { ref?: React.RefObject<T | null> | ((instance: T | null) => void) | null };

// Questo è il tipo che mancava e causava l'errore in icon.tsx
type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined; children?: React.ReactNode });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  children?: React.ReactNode;
} & DOMMotionProps<T>;

// --- UTILITY ---
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else if (typeof ref === "object" && ref !== null && "current" in ref) {
        (ref as any).current = node;
      }
    });
  };
}

function mergeProps(childProps: AnyProps, slotProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...childProps.style,
      ...slotProps.style,
    };
  }

  return merged;
}

// --- COMPONENTE ---
const Slot = React.forwardRef<HTMLElement, SlotProps<any>>(
  ({ children, ...props }, forwardedRef) => {
    if (!React.isValidElement(children)) return null;

    const isAlreadyMotion =
      typeof children.type === "object" &&
      children.type !== null &&
      isMotionComponent(children.type);

    const Base = isAlreadyMotion
      ? (children.type as any)
      : motion.create(children.type as any);

    const { ref: childRef, ...childProps } = children.props as AnyProps;

    const mergedProps = mergeProps(childProps, props);

    return <Base {...mergedProps} ref={mergeRefs(childRef, forwardedRef)} />;
  },
);

Slot.displayName = "Slot";

export { Slot };
export type { SlotProps, WithAsChild, DOMMotionProps, AnyProps };
