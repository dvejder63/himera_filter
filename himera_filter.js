// ==UserScript==
// @name         Рект 2.0
// @namespace    http://tampermonkey.net/
// @version      1.2b
// @description  Alham!
// @author       Anchoys
// @match        https://himera-search.net/report/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=himera-search.net
// @grant        none
// @updateURL    https://petrovsasha228.vercel.app/rekt.js
// @downloadURL  https://petrovsasha228.vercel.app/rekt.js
// ==/UserScript==

(function () {
    var currentPath = window.location.href;
   // Get all the report card elements
   const reportCardCount =
     document.getElementsByClassName("report-card").length - 2;
   console.log(reportCardCount);
   const reportCards = Array.from(
     {
       length: reportCardCount,
     },
     (_, i) => i + 1
   ).map((i) => document.querySelector(`#info${i}`));
   // Extract the report details from each report card element
   const reportDetailsArray = reportCards.map((reportCard) => {
     if (!reportCard) {
       return false;
     }
     return extractReportDetails(reportCard);
   });
   // Remove duplicates from the report details array
   const uniqueReportDetailsArray = [
     ...new Set(reportDetailsArray.map(JSON.stringify)),
   ].map(JSON.parse);
   // Filter the report details array
   const filteredReportDetailsArray = filterReportDetailsArray(
     uniqueReportDetailsArray
   );
   // Print the filtered report details to the console
   filteredReportDetailsArray.forEach((reportDetails) => {
     //  console.log(${reportDetails.name} ${reportDetails.birthdate});
     //
     // console.log(Сумма: ${reportDetails.income});
     // console.log('   ');
   });
   // Define the extractReportDetails() function
   function extractReportDetails(reportCard) {
     // Get the report details element
     const details = reportCard.querySelector(".report-details");
     if (details != details) {
       name = "Бомж";
       birthdate = "01.01.1920";
       income = "1200";
     }
     // Filter the dt elements by text
     const filterDtByText = (text) => {
       const regex = new RegExp(text, "i");
       return [...details.querySelectorAll("dt")].find((dt) =>
         regex.test(dt.textContent.trim())
       );
     };
  
     // Find the corresponding dd elements
     const name = filterDtByText("Имя")
       ? filterDtByText("Имя").nextElementSibling.textContent
       : "";
     const birthdate = filterDtByText("Дата рождения")
       ? filterDtByText("Дата рождения").nextElementSibling.textContent
       : "";
     const income = filterDtByText("Сумма.*")
       ? filterDtByText("Сумма.*").nextElementSibling.textContent
       : "";
     const bt = formatSettings(birthdate);
     // Return the report details
     return {
       name,
       birthdate: bt,
       income: income,
     };
   }
  
   function formatSettings(inputString) {
     // Check if inputString is undefined or null
     if (!inputString) {
       // Handle the error or return an appropriate value
       return "Нету даты";
     }
  
     const dateParts = inputString.split(".");
  
     // Check if there are three elements in the array
     if (dateParts.length !== 3) {
       // Handle the error or return an appropriate value
       return "Нету даты";
     }
  
     // Destructuring assignment
     let [day, month, year] = dateParts;
  
     // Pad day and month with leading zeros if needed
     const paddedDay = day.length === 1 ? "0" + day : day;
     const paddedMonth = month.length === 1 ? "0" + month : month;
  
     // Return formatted date string in the format: "YYYY-MM-DD"
     return `${paddedDay}.${paddedMonth}.${year}`;
   }
  
   function filterReportDetailsArray(reportDetailsArray) {
     const filteredArray = reportDetailsArray.filter((reportDetails) => {
       let birthdate = reportDetails.birthdate;
       if (birthdate === "Нету даты") {
         return false;
       }
  
       let date = "" + birthdate;
       const dateq = Date.parse(date);
       const fff = new Date(dateq);
       let year = date.toString().slice(-4);
       if (year < 1940 || year > 1975) {
         return false;
       }
  
       // Check if the income is greater than 450k
       const income = parseInt(reportDetails.income);
       if (income <= 80000) {
         return false;
       }
       // If all criteria are met, return true
       return true;
     });
  
     // Sort the filtered array by year and income
     const sortedArray = sortByIncome(filteredArray);
  
     return sortedArray;
   }
   // Function to sort report details by year and income
   function sortByIncome(reportDetailsArray) {
     return reportDetailsArray.sort((a, b) => {
       const incomeA = parseInt(a.income);
       const incomeB = parseInt(b.income);
       return incomeB - incomeA;
     });
   }
   function NotSupReportDetailsArray(reportDetailsArray) {
     const filteredArray = reportDetailsArray.filter((reportDetails) => {
       // Check if the birthdate is within the specified range
       let birthdate = reportDetails.birthdate;
       if (birthdate === "Нету даты") {
         return false;
       }
  
       let date = "" + birthdate;
       const dateq = Date.parse(date);
       const fff = new Date(dateq);
       let year = date.toString().slice(-4);
       if (year < 1940 || year > 1975) {
         return false;
       }
  
       // Check if the income is greater than 450k
       const income = parseInt(reportDetails.income);
       if (income <= 80000) {
         return true;
       }
  
       return false;
     });
  
     // Sort the filtered array by year and income
      const sortedArray = sortByIncome(filteredArray);
  
     return sortedArray;
   }
   const filteredReportDetailsString = filteredReportDetailsArray
     .map(
       (reportDetails) =>
         `${reportDetails.name} ${reportDetails.birthdate}\nТелефон: \nСумма: ${reportDetails.income}\n\n`
     )
     .join("");
   var filReportDetailsArray = NotSupReportDetailsArray(uniqueReportDetailsArray);
   const bomzh = filReportDetailsArray
     .map(
       (reportDetails) =>
         `${reportDetails.name} ${reportDetails.birthdate}\nТелефон: \nСумма: ${reportDetails.income}\n\n`
     )
     .join("");
   console.log("\n\n\n"+currentPath+"\n\n"+
     "-------------------------\n\n" +
       filteredReportDetailsString +
       "\n------------------------------\n\tНЕПОДХОДЯТ ПО ЗП $$$\n\n\n" +
       bomzh
   );
  })();
  