import React from "react";

function BookingHistory({ bookings, onCancel }) {
  if (bookings.length === 0) {
    return (
      <div className="history-card empty-history">
        <p>Nessuna prenotazione confermata.</p>
      </div>
    );
  }

  return (
    <div className="history-card">
      <h3 className="history-title">Le Tue Prenotazioni</h3>
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            <div className="booking-details">
              <p className="booking-movie">
                <strong>{booking.movieTitle}</strong>
              </p>
              <p className="booking-info">
                {booking.hallName} - {booking.time}
              </p>
              <p className="booking-seats">
                Posti: {booking.seats.join(", ")}
              </p>
            </div>
            <div className="booking-actions">
              <p className="booking-price">
                Totale: <strong>{booking.totalPrice.toFixed(2)} €</strong>
              </p>
              <button
                className="btn-cancel"
                onClick={() => onCancel(booking.id)}
              >
                Annulla
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingHistory;