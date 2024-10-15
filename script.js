document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add the loading row at the start
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = `<td colspan="2" class="text-center loading">Loading...</td>`;
  output.appendChild(loadingRow);

  // Helper function to create a promise that resolves after a random time between 1 and 3 seconds
  function createPromise(index) {
    const time = Math.floor(Math.random() * 3000) + 1000; // Random time between 1000ms (1s) and 3000ms (3s)
    return new Promise((resolve) => {
      setTimeout(() => resolve(time / 1000), time); // Convert milliseconds to seconds
    });
  }

  // Create 3 promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  const startTime = performance.now(); // Start tracking total time

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises).then((times) => {
    // Calculate total time
    const totalTime = (performance.now() - startTime) / 1000;

    // Remove the loading row
    output.innerHTML = "";

    // Populate the table with results
    times.forEach((time, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>Promise ${index + 1}</td><td>${time.toFixed(3)} s</td>`;
      output.appendChild(row);
    });

    // Add the total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)} s</td>`;
    output.appendChild(totalRow);
  });
});
