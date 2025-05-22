document.addEventListener("DOMContentLoaded", function () {
  const calendarBtn = document.getElementById("calendarBtn");
  const selectedDateSpan = document.getElementById("selectedDate");
  const availabilityMessage = document.getElementById("availabilityMessage");
  const hiddenDateInput = document.getElementById("hiddenDate");
  const proceedToPaymentButton = document.getElementById("payButton");

  const tourType = document.getElementById("tourType")?.value;
  const tourSlug = document.getElementById("tourSlugInput")?.value;
  const isTransfer = document.getElementById("is_transfer")?.value === "true";
  const transferId = document.getElementById("transferIdInput")?.value;

  // 🕒 Malaysia Time (with simulated hour)
  function getMalaysiaNow() {
  const now = new Date();

  // Use IANA timezone for actual Malaysian time
  const malaysiaTimeString = now.toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
    hour12: false,
  });
  const malaysiaNow = new Date(malaysiaTimeString);

  // ✅ Simulate after 10 PM (uncomment to test)
  //malaysiaNow.setHours(22, 0, 0, 0); // Simulates 10:00 PM Malaysia time
  return malaysiaNow;
}


  const malaysiaNow = getMalaysiaNow();
  const todayMY = new Date(malaysiaNow);
  todayMY.setHours(0, 0, 0, 0);

  const enabledDates = [];
  for (let i = 1; i <= 60; i++) {
    const date = new Date(todayMY);
    date.setDate(date.getDate() + i);
    enabledDates.push(date.toISOString().split("T")[0]);
  }

  const fp = flatpickr(hiddenDateInput, {
    dateFormat: "Y-m-d",
    enable: enabledDates,
    minDate: new Date(todayMY.getTime() + 86400000),

    onChange: function (selectedDates, dateStr) {
      selectedDateSpan.textContent = selectedDates[0].toDateString();
      availabilityMessage.innerHTML = "⏳ Checking...";

      const malaysiaNow = getMalaysiaNow();
      const currentHourMY = malaysiaNow.getHours();

      const selectedDate = new Date(dateStr);
      selectedDate.setHours(0, 0, 0, 0);

      const tomorrow = new Date(malaysiaNow);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (selectedDate.getTime() === tomorrow.getTime() && currentHourMY >= 22) {
        availabilityMessage.innerHTML = `<span style="color:orange;">⚠️ Booking for tomorrow is closed after 10 PM MYT</span>`;
        document.getElementById("payButton").disabled = true;
        document.getElementById("timeBtn").disabled = true;
        document.getElementById("selectedTime").textContent = "Select Time";
        slotAvailable = false;
        return;
      }

      let payload = {
        date: dateStr,
        is_transfer: isTransfer,
        tour_slug: tourSlug,
        tour_type: tourType,
      };
      if (isTransfer) payload.transfer_id = transferId;

      fetch("/check-availability/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          const slotStatus = document.getElementById("availabilityMessage");
          const payButton = document.getElementById("payButton");
          const selectedTime = document.getElementById("selectedTime");
          const timeBtn = document.getElementById("timeBtn");

          if (data.available) {
            slotStatus.innerHTML = "<span style='color:green'>✅ Slot is available</span>";
            payButton.disabled = false;
            slotAvailable = true;
            if (data.start_time) {
              selectedTime.textContent = data.start_time;
              timeBtn.disabled = false;
            }
          } else {
            let message = "<span style='color:red'>❌ Slot is not available</span>";
            if (data.next_available) {
              message += `<br><span style="color:gray;">Next available: ${data.next_available}</span>`;
            }
            slotStatus.innerHTML = message;
            payButton.disabled = true;
            timeBtn.disabled = true;
            selectedTime.textContent = "Select Time";
            slotAvailable = false;
          }
        });
    }
  });

  calendarBtn.addEventListener("click", function () {
    fp.open();
  });

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});
