export const priority = `(
  CASE 
    WHEN card.interest = 0 THEN 999 
    WHEN card.annual_fee > 1000 THEN 998 
    ELSE card.interest
  END
)`;

export const totalRating = `(card.bonuses_rating + card.traveling_rating + card.insurances_rating)`;

export const insuranceRating = `(card.insurances_rating)`;
