export default function Rating({ value, count }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star ${i <= Math.round(value) ? 'filled' : ''}`}>★</span>
      ))}
      <span className="rating-text">({count})</span>
    </div>
  );
}
