type SingleOfferPageProps = {
  params: {
    offerId: string;
  };
};

export default function SingleOfferPage({ params }: SingleOfferPageProps) {
  return <div>Single Offer - {params.offerId}</div>;
}
