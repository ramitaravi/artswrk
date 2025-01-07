import csv,psycopg2,datetime
def parse_date(d):
    try: return datetime.datetime.strptime(d," %d, %Y %I:%M %p") if d else None
    except: return None
conn=psycopg2.connect(dbname="userdb",user="ramitaravi",password="Rawmeat22!",host="localhost")
cur=conn.cursor()
with open("Dev-Bookings.csv") as f:
    reader=csv.DictReader(f)
    for row in reader:
        try:
            cur.execute("INSERT INTO bookings VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(row["unique id"],row["_Option_Booking_Status"],row["_Option_Payment_Status"],True if row["Added to Spreadsheet?"]=="yes" else None if row["Added to Spreadsheet?"]=="" else False,row["Artist"],row["Artist Rate"],row["Client"],row["Client Rate"],True if row["deleted?"]=="yes" else None if row["deleted?"]=="" else False,row["Description"],parse_date(row["End date"]),True if row["external payment?"]=="yes" else None if row["external payment?"]=="" else False,row["Gross Profit"],row["hours"],row["Interested Artist"],True if row["invoice"]=="yes" else None if row["invoice"]=="" else False,row["Job"],row["List of Payments"],row["List of Reimbursement"],row["Location"],row["new_rate_proposal"],row["new_rate_proposal_message"],True if row["Notification_Artist_Scheduled_Reminder"]=="yes" else None if row["Notification_Artist_Scheduled_Reminder"]=="" else False,True if row["On-Demand Service"]=="yes" else None if row["On-Demand Service"]=="" else False,row["Post Fee Revenue"],row["Request"],row["Session Number"],True if row["show_alert?"]=="yes" else None if row["show_alert?"]=="" else False,parse_date(row["Start date"]),row["Stripe checkout url"],row["stripe fee"],row["Time Slot"],row["Total Artist Rate (Artist Rate + Reimbursements)"],row["Total Client Rate (Client Rate + Reimbursements)"],row["Wf_ID 1"],row["Wf_ID 2"],parse_date(row["Creation Date"]),parse_date(row["Modified Date"]),row["Slug"],row["Creator"]))
            conn.commit()
        except Exception as e:
            print("Error on row:", row["unique id"])
            conn.rollback()
cur.close()
conn.close()
print("Data import completed")