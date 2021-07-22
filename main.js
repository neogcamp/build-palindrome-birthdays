const birthDate = document.querySelector("#birth-date");
const btn = document.querySelector("#btn-check");
const output = document.querySelector("#output");
const loader = document.querySelector("#loading");
const reset = document.querySelector("#reset");

const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

btn.addEventListener("click", () => {
  if (birthDate.value === "") {
    output.innerText = "Please select your birthdate";
  } else {
    const dateArray = birthDate.value.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const palindromeBirthday = dateFormatter(year, month, day);
    loader.className = "show";
    output.className = "hide";
    setTimeout(() => {
      loader.className = loader.className.replace("show", "");
      output.className = output.className.replace("hide", "");
      if (palindromeBirthday) {
        output.innerText = `Hurray!!, You birthday ${palindromeBirthday} is a  Palindrome Birthday`;
      } else {
        const [nextDate, difference] = findNextDate(year, month, day);
        output.innerText = `Ohh no, your birthday isn't palindrome, but the nearest date is ${nextDate}. You have missed ${difference} days`;
      }
    }, 2000);
  }
});

function checkPalindrome(birthdate) {
  let rev = birthdate.split("").reverse("").join("");
  return rev === birthdate;
}

function dateFormatter(year, month, day) {
  // YYYY - MM - DD
  // MM - DD - YYYY
  // DD - MM - YYYY
  // YY - MM - DD
  // MM - DD - YY
  // DD - MM - YY

  const yyyyMMDD = year + month + day;
  const mmDDYYYY = month + day + year;
  const ddMMYYYY = day + month + year;
  const yearIn2Digits = year.slice(-2);
  const yyMMDD = yearIn2Digits + month + day;
  const mmDDYY = month + day + yearIn2Digits;
  const ddMMYY = day + month + yearIn2Digits;

  switch (true) {
    case checkPalindrome(yyyyMMDD):
      return `${year}-${month}-${day}`;
    case checkPalindrome(mmDDYYYY):
      return `${month}-${day}-${year}`;
    case checkPalindrome(ddMMYYYY):
      return `${day}-${month}-${year}`;
    case checkPalindrome(yyMMDD):
      return `${yearIn2Digits}-${month}-${day}`;
    case checkPalindrome(mmDDYY):
      return `${month}-${day}-${yearIn2Digits}`;
    case checkPalindrome(ddMMYY):
      return `${day}-${month}-${yearIn2Digits}`;
    default:
      return null;
  }
}

function findNextDate(year, month, day) {
  let ddNo1 = Number(day);
  let mmNo1 = Number(month);
  let yyNo1 = Number(year);
  let ddNo2 = Number(day);
  let mmNo2 = Number(month);
  let yyNo2 = Number(year);

  for (let i = 1; i > 0; i++) {
    //forward check
    ddNo1 = ddNo1 + 1;
    if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
      ddNo1 = 1;
      mmNo1 = mmNo1 + 1;
      if (mmNo1 > 12) {
        mmNo1 = 1;
        yyNo1 = yyNo1 + 1;
      }
    }
    let yyString = yyNo1.toString();
    let mmString = mmNo1.toString();
    let ddString = ddNo1.toString();
    if (mmString.length == 1) {
      mmString = "0" + mmString;
    }
    if (ddString.length == 1) {
      ddString = "0" + ddString;
    }
    let setFlagNextDate = dateFormatter(yyString, mmString, ddString);
    if (setFlagNextDate) {
      return [`${setFlagNextDate}`, i];
    }

    //backward check
    if (yyNo2 > 1) {
      ddNo2 = ddNo2 - 1;
      if (ddNo2 < 1) {
        mmNo2 = mmNo2 - 1;
        if (mmNo2 < 1) {
          mmNo2 = 12;
          yyNo2 = yyNo2 - 1;
          if (yyNo2 < 1) {
            break;
          }
          ddNo2 = datesInMonth[mmNo2 - 1];
        }
      }
      let yyString = yyNo2.toString();
      let mmString = mmNo2.toString();
      let ddString = ddNo2.toString();
      if (mmString.length == 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length == 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = dateFormatter(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }
    }
  }
}

reset.addEventListener("click", () => {
  birthDate.value = "";
  output.innerText = "";
});
