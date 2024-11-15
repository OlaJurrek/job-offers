import Headline from "@/ui/dashboard/typography/BigText";
import InnerNav from "@/ui/dashboard/navigation/InnerNav/InnerNav";

export default function OffersPage() {
  return (
    <>
      <Headline variant="h1">Offers</Headline>
      <InnerNav
        searchPlaceholder="Search offers..."
        linkName="Create Offer"
        href="/admin/offers/create"
      />
      <div>TODO: compoennt OffersList</div>
    </>
  );
}
