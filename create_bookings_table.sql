CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    _Option_Booking_Status VARCHAR(50),
    _Option_Payment_Status VARCHAR(50),
    "Added to Spreadsheet?" VARCHAR(5),
    "Artist" VARCHAR(255),
    "Artist Rate" VARCHAR(50),
    "Client" VARCHAR(255),
    "Client Rate" VARCHAR(50),
    "deleted?" VARCHAR(5),
    "Description" TEXT,
    "End date" VARCHAR(255),
    "external payment?" VARCHAR(5),
    "Gross Profit" VARCHAR(50),
    "hours" VARCHAR(50),
    "Interested Artist" VARCHAR(255),
    "invoice" VARCHAR(5),
    "Job" VARCHAR(255),
    "List of Payments" TEXT,
    "List of Reimbursement" TEXT,
    "Location" TEXT,
    "new_rate_proposal" VARCHAR(50),
    "new_rate_proposal_message" TEXT,
    "Notification_Artist_Scheduled_Reminder" VARCHAR(5),
    "On-Demand Service" VARCHAR(5),
    "Post Fee Revenue" VARCHAR(50),
    "Request" VARCHAR(255),
    "Session Number" VARCHAR(50),
    "show_alert?" VARCHAR(5),
    "Start date" VARCHAR(255),
    "Stripe checkout url" TEXT,
    "stripe fee" VARCHAR(50),
    "time" TEXT,
    "Time Slot" VARCHAR(255),
    "Total Artist Rate (Artist Rate + Reimbursements)" VARCHAR(50),
    "Total Client Rate (Client Rate + Reimbursements)" VARCHAR(50),
    "Wf_ID 1" VARCHAR(255),
    "Wf_ID 2" VARCHAR(255),
    "Creation Date" VARCHAR(255),
    "Modified Date" VARCHAR(255),
    "Slug" VARCHAR(255),
    "Creator" VARCHAR(255),
    "unique id" VARCHAR(255) UNIQUE
);

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_bookings_artist ON bookings("Artist");
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings("Client");
CREATE INDEX IF NOT EXISTS idx_bookings_start_date ON bookings("Start date");
CREATE INDEX IF NOT EXISTS idx_bookings_booking_status ON bookings(_Option_Booking_Status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(_Option_Payment_Status); 