"use client";
import useDict from "@/hooks/useDict";
export default function Header({ lang }: { lang: string }) {
  const dict = useDict(lang);
  return <header>{dict.product.cart}</header>;
}
