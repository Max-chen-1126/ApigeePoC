function formatDateTimeISO(dateTimeStr) {
  const dateTime = new Date(dateTimeStr);
  if (isNaN(dateTime.getTime())) {
    // Handle invalid date-time case here, e.g., log a message
    console.error("Invalid date-time string format:", dateTimeStr);
    return null; // Or return a default value
  }
  return dateTime.toISOString();
}

function formatKeys(obj) {
  const formattedObj = {};

  for (const [key, value] of Object.entries(obj)) {
    let newKey;

    if (key === "ID") {
      newKey = "id";
    } else {
      newKey = key.replace(/^[A-Z]/, (match) => match.toLowerCase());
    }
    formattedObj[newKey] = value;
  }
  return formattedObj;
}

// Define the test suite
describe("formatKeys", () => {
  // Define the test cases
  const testCases = [
    {
      name: "should format keys with uppercase first letter",
      input: { Name: "John", Age: 30 },
      expected: { name: "John", age: 30 },
    },
    {
      name: 'should format key "ID" to "id"',
      input: { ID: 1 },
      expected: { id: 1 },
    },
    {
      name: "should handle empty object",
      input: {},
      expected: {},
    },
    {
      name: "should handle object with lowercase keys",
      input: { name: "John", age: 30 },
      expected: { name: "John", age: 30 },
    },
  ];

  // Run the test cases
  testCases.forEach(({ name, input, expected }) => {
    test(name, () => {
      expect(formatKeys(input)).toEqual(expected);
    });
  });
});
