const processData = (csvString) => {
  const results = [];
  const pairs = {};
  let pairsData = [];

  csvString
    .trim()
    .split("\n")
    .slice(1)
    .forEach((line) => {
      const data = line.trim().split(",");
      const normalizedData = {
        EmpID: parseInt(data[0]),
        ProjectID: parseInt(data[1]),
        DateFrom: data[2].trim() !== "NULL" ? new Date(data[2]) : new Date(),
        DateTo: data[3].trim() !== "NULL" ? new Date(data[3]) : new Date(),
      };
      results.push(normalizedData);
    });

  for (let i = 0; i < results.length; i++) {
    const {
      EmpID: emp1,
      ProjectID: proj1,
      DateFrom: from1,
      DateTo: to1,
    } = results[i];

    for (let j = i + 1; j < results.length; j++) {
      const {
        EmpID: emp2,
        ProjectID: proj2,
        DateFrom: from2,
        DateTo: to2,
      } = results[j];

      if (proj1 === proj2) {
        const key = `${Math.min(emp1, emp2)},${Math.max(emp1, emp2)}`;
        const commonStart = from1 < from2 ? from2 : from1;
        const commonEnd = to1 < to2 ? to1 : to2;
        if (commonStart <= commonEnd) {
          const oneDay = 24 * 60 * 60 * 1000;
          const duration =
            Math.round(Math.abs((commonEnd - commonStart) / oneDay)) + 1;

          if (key in pairs) {
            pairs[key] += duration;
          } else {
            pairs[key] = duration;
          }
          pairsData.push({
            key: key,
            emp1ID: emp1,
            emp2ID: emp2,
            projectID: proj1,
            duration: duration,
          });
        }
      }
    }
  }

  let maxDuration = 0;
  let maxPair = "";
  for (const key in pairs) {
    if (pairs[key] > maxDuration) {
      maxDuration = pairs[key];
      maxPair = key;
    }
  }

  pairsData = pairsData.filter((val) => val.key === maxPair);
  for (let i = 0; i < pairsData.length; i++) {
    delete pairsData[i].key;
  }

  return pairsData;
};

module.exports = processData;
