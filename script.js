// code to check dublicates in a array

function findDuplicates(arr) {
  let sortedArr = arr.sort();
  let results = [];
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] == sortedArr[i]) {
      if (!results.includes(sortedArr[i])) {
        results.push(sortedArr[i]);
      }
    }
  }
  return results;
}

const arr = [
  "https://web.telegram.org/k/#-1500633049",
  "https://web.telegram.org/k/#-1598645842",
  "https://web.telegram.org/k/#5911106654",
  "https://web.telegram.org/k/#-1733332176",
  "https://web.telegram.org/k/#5131609971",
  "https://web.telegram.org/k/#5810391161",
  "https://web.telegram.org/k/#5954577085",
  "https://web.telegram.org/k/#5460021029",
  "https://web.telegram.org/k/#5386982895",
  "https://web.telegram.org/k/#-1808415599",
  "https://web.telegram.org/k/#-1290773398",
  "https://web.telegram.org/k/#5670286844",
  "https://web.telegram.org/k/#5450801292",
  "https://web.telegram.org/k/#5470749104",
  "https://web.telegram.org/k/#5576309787",
  "https://web.telegram.org/k/#875863813",
  "https://web.telegram.org/k/#5360662787",
  "https://web.telegram.org/k/#5709488272",
  "https://web.telegram.org/k/#-1561040521",
  "https://web.telegram.org/k/#5489859399",
  "https://web.telegram.org/k/#-1541069716",
  "https://web.telegram.org/k/#5354579580",
  "https://web.telegram.org/k/#5362685604",
  "https://web.telegram.org/k/#-1705885679",
  "https://web.telegram.org/k/#-1534547044",
  "https://web.telegram.org/k/#-1754861784",
  "https://web.telegram.org/k/#-784972061",
  "https://web.telegram.org/k/#-1259293860",
  "https://web.telegram.org/k/#-1643970671",
  "https://web.telegram.org/k/#-1542257291",
  "https://web.telegram.org/k/#-1664448366",
  "https://web.telegram.org/k/#777000",
  "https://web.telegram.org/k/#-1539884229",
  "https://web.telegram.org/k/#-1933215501",
  "https://web.telegram.org/k/#-1740727166",
  "https://web.telegram.org/k/#-1673880533",
  "https://web.telegram.org/k/#-1004981638",
  "https://web.telegram.org/k/#-1004981638",
];

// code to find dublicates in a array of string values
let duplicates = findDuplicates(arr);
console.log(duplicates); // Output: ["banana", "orange"]
