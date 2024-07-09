import { getDictinary } from "@/dictionaries";
import Header from "@/components/header";
import LocaleSwitcher from "@/components/locale/localeSwitcher";
export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictinary(lang);
  return (
    <div>
      <div className="flex w-screen justify-end">
        <LocaleSwitcher className="relative" />
      </div>
      <button className="bg-blue-500 text-white rounded-md px-2 py-3 m-5 hover:bg-blue-700">
        {dict.product.cart}
      </button>
      <Header lang={lang} />
    </div>
  );
}
