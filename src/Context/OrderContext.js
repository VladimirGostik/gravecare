import { createContext, useContext, useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../Services/orders';

// Vytvorenie OrderContext
const OrderContext = createContext();

const mockOrders = [
  {
    "id": 1,
    "customerId": 2,
    "entrepreneurId": 10,
    "customerName": "Peter Novák",
    "address": "Hlavná 123, Bratislava",
    "description": "Hrob je umiestnený na západnej strane cintorína.",
    "selectedServices": [
      "Úrčba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Odstraňovanie buriny a machu"
    ],
    "totalPrice": "80 eur",
    "status": "pending",
    "IncludeInPortfolio": null,
    "deadline": "2024-10-15",
    "dateCompleted": "2024-10-12",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Bratislava",
    "entrepreneurName": "Hrobová starostlivosť Bratislava"
  },
  {
    "id": 2,
    "customerId": 1,
    "entrepreneurId": 6,
    "customerName": "Anna Kováčová",
    "address": "Dunajská 44, Nitra",
    "description": "Rodinný hrob na severnej strane cintorína.",
    "cemeteryName": "Cintorín Nitra",
    "entrepreneurName": "Pohrebné služby Levice",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "60 eur",
    "status": "Completed",
    "IncludeInPortfolio": 1,
    "deadline": "2024-09-20",
    "dateCompleted": "2024-09-18",
    "rating": 4,
    "beforeImage": "images/orders/order2-before.jpg",
    "afterImage": "images/orders/order2-after.jpg",
    "written_review": "Výborne vykonaná práca, určite využijem službu znova."
  },
  {
    "id": 3,
    "customerId": 3,
    "entrepreneurId": 6,
    "customerName": "Jozef Horváth",
    "address": "Štúrova 78, Košice",
    "description": "Malý hrob pri hlavném vchode.",
    "selectedServices": [
      "Pokládka kvetín a vencov",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "45 eur",
    "status": "pending",
    "deadline": "2024-09-27",
    "dateCompleted": "2024-09-26",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Košice",
    "entrepreneurName": "Kvetinový servis Košice"
  },
  {
    "id": 4,
    "customerId": 1,
    "entrepreneurId": 2,
    "customerName": "Lucia Poláková",
    "address": "Jazerná 12, Banská Bystrica",
    "description": "Hrob pri jazere, blízko lesnej cesty.",
    "cemeteryName": "Cintorín Banská Bystrica",
    "entrepreneurName": "Pohrebné služby Banská Bystrica",
    "selectedServices": [
      "Odstraňovanie buriny a machu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "75 eur",
    "status": "Completed",
    "IncludeInPortfolio": 2,
    "deadline": "2024-09-10",
    "dateCompleted": "2024-09-08",
    "rating": 5,
    "beforeImage": "images/orders/order4-before.jpg",
    "afterImage": "images/orders/order4-after.jpg",
    "written_review": "Perfektné, nemám čo vytknúť!"
  },
  {
    "id": 5,
    "customerId": 4,
    "entrepreneurId": 5,
    "entrepreneurName": "Cintorínske služby Trnava",
    "cemeteryName": "Centrálny cintorín Trnava",
    "customerName": "Mária Hrubá",
    "address": "Malá 9, Trnava",
    "description": "Hrob umiestnený v centrálnej časti cintorína.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Odstraňovanie buriny a machu"
    ],
    "totalPrice": "50 eur",
    "status": "NotConfirmed",
    "deadline": "2024-10-05",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 6,
    "customerId": 1,
    "entrepreneurId": 8,
    "entrepreneurName": "Záhradnícke práce Žilina",
    "cemeteryName": "Cintorín pod Lipami",
    "customerName": "Ivan Janošík",
    "address": "Záhradná 11, Žilina",
    "description": "Hrob v rohu cintorína pod stromami.",
    "selectedServices": [
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "30 eur",
    "status": "NotConfirmed",
    "deadline": "2024-10-12",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 7,
    "customerId": 5,
    "entrepreneurId": 9,
    "customerName": "Martina Čierna",
    "address": "Horská 5, Poprad",
    "description": "Rodinný hrob pri lesíku.",
    "selectedServices": [
      "Úrčba a čistenie hrobu",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "70 eur",
    "status": "pending",
    "deadline": "2024-10-20",
    "dateCompleted": "2024-10-15",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Lesný cintorín Poprad",
    "entrepreneurName": "Pohrebný servis Poprad"
  },
  {
    "id": 8,
    "customerId": 1,
    "entrepreneurId": 4,
    "customerName": "Ján Biely",
    "address": "Zelená 23, Trenčín",
    "description": "Starý hrob pri hlavnom kríži.",
    "cemeteryName": "Cintorín Trenčín",
    "entrepreneurName": "Záhradnícke práce Trenčín",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "85 eur",
    "status": "Completed",
    "IncludeInPortfolio": 3,
    "deadline": "2024-09-25",
    "dateCompleted": "2024-09-23",
    "rating": 4,
    "beforeImage": "images/orders/order8-before.jpg",
    "afterImage": "images/orders/order8-after.jpg",
    "written_review": "Dobrý výsledok, ale na budúce očakávam lepšiu komunikáciu."
  },
  {
    "id": 9,
    "customerId": 1,
    "entrepreneurId": 7,
    "customerName": "Petra Bieliková",
    "address": "Tichá 12, Martin",
    "description": "Rodinný hrob blízko vstupu do cintorína.",
    "selectedServices": [
      "Úrčba a čistenie hrobu"
    ],
    "totalPrice": "40 eur",
    "status": "pending",
    "deadline": "2024-10-08",
    "dateCompleted": "2024-10-05",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Martin",
    "entrepreneurName": "Rodinný servis Martin"
  },
  {
    "id": 10,
    "customerId": 6,
    "entrepreneurId": 3,
    "customerName": "Mária Smreková",
    "address": "Dubová 7, Prešov",
    "description": "Hrob pri ceste s výhľadom na hory.",
    "selectedServices": [
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "55 eur",
    "status": "pending",
    "deadline": "2024-10-03",
    "dateCompleted": "2024-10-01",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Prešov",
    "entrepreneurName": "Náhrobný servis Prešov"
  },
  {
    "id": 11,
    "customerId": 1,
    "entrepreneurId": 6,
    "customerName": "František Kováč",
    "address": "Lipová 6, Levice",
    "description": "Malý hrob pri kríži.",
    "selectedServices": [
      "Úrčba a čistenie hrobu",
      "Odstraňovanie buriny a machu"
    ],
    "totalPrice": "65 eur",
    "status": "pending",
    "deadline": "2024-10-14",
    "dateCompleted": "2024-10-10",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Levice",
    "entrepreneurName": "Hrobová starostlivosť Levice"
  }, 
  {
    "id": 12,
    "customerId": 4,
    "entrepreneurId": 8,
    "customerName": "Monika Smetanová",
    "address": "Hájová 9, Zvolen",
    "description": "Hrob pod veľkým stromom.",
    "cemeteryName": "Cintorín Zvolen",
    "entrepreneurName": "Cintorínske služby Zvolen",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "70 eur",
    "status": "Completed",
    "IncludeInPortfolio": 4,
    "deadline": "2024-09-30",
    "dateCompleted": "2024-09-28",
    "rating": 3,
    "beforeImage": "images/orders/order12-before.jpg",
    "afterImage": "images/orders/order12-after.jpg",
    "written_review": "Dobrý výsledok, ale očakával som viac."
  },
  {
    "id": 13,
    "customerId": 1,
    "entrepreneurId": 1,
    "customerName": "Miloš Jurík",
    "address": "Železničná 2, Bardejov",
    "description": "Rodinný hrob vedľa hlavnej kaplnky.",
    "selectedServices": [
      "Pokládka kvetín a vencov",
      "Odstraňovanie buriny a machu"
    ],
    "totalPrice": "50 eur",
    "status": "pending",
    "deadline": "2024-10-18",
    "dateCompleted": "2024-10-18",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Bardejov",
    "entrepreneurName": "Záhradnícke práce Bardejov"
  },
  {
    "id": 14,
    "customerId": 2,
    "entrepreneurId": 2,
    "customerName": "Jozef Chren",
    "address": "Lesná 14, Žarnovica",
    "description": "Hrob blízko jazera, s výhľadom na les.",
    "cemeteryName": "Cintorín Žarnovica",
    "entrepreneurName": "Pohrebné služby Banská Bystrica",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "90 eur",
    "status": "Completed",
    "IncludeInPortfolio": 5,
    "deadline": "2024-09-12",
    "dateCompleted": "2024-09-10",
    "rating": 5,
    "beforeImage": "images/orders/order14-before.jpg",
    "afterImage": "images/orders/order14-after.jpg",
    "written_review": "Fantastický výsledok, odporúčam všetkým."
  },
  {
    "id": 15,
    "customerId": 1,
    "entrepreneurId": 3,
    "customerName": "Pavol Dubec",
    "address": "Vysoká 15, Nové Zámky",
    "description": "Hrob na severnej strane cintorína.",
    "selectedServices": [
      "Úrčba a čistenie hrobu"
    ],
    "totalPrice": "35 eur",
    "status": "pending",
    "deadline": "2024-10-22",
    "dateCompleted": "2024-10-20",
    "rating": null,
    "written_review": null,
    "cemeteryName": "Cintorín Nové Zámky",
    "entrepreneurName": "Náhrobný servis Nové Zámky"
  },{
    "id": 16,
    "customerId": 1,
    "entrepreneurId": 4,
    "entrepreneurName": "Pamiatky Brno",
    "cemeteryName": "Cintorín Brno-Sever",
    "customerName": "Jozko Janošík",
    "address": "Záhradná 35, Brno",
    "description": "Hrob v rohu cintorína pod stromami nad kameňom vpravo.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov",
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "300 eur",
    "status": "NotConfirmed",
    "deadline": "2024-10-12",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 17,
    "customerId": 1,
    "entrepreneurId": 6,
    "entrepreneurName": "Hrobová údržba Bratislava",
    "cemeteryName": "Starý cintorín Bratislava",
    "customerName": "Anna Nováková",
    "address": "Dunajská 78, Bratislava",
    "description": "Hrob uprostred cintorína pri fontáne.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "180 eur",
    "status": "NotConfirmed",
    "deadline": "2024-11-15",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 18,
    "customerId": 7,
    "entrepreneurId": 9,
    "entrepreneurName": "Komplexná starostlivosť Košice",
    "cemeteryName": "Cintorín Košice-Vrchol",
    "customerName": "Marek Polák",
    "address": "Hviezdoslavova 12, Košice",
    "description": "Hrob na vrchole cintorína s výhľadom na les.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov",
      "Údržba zelene"
    ],
    "totalPrice": "250 eur",
    "status": "NotConfirmed",
    "deadline": "2024-12-01",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 19,
    "customerId": 1,
    "entrepreneurId": 8,
    "entrepreneurName": "Záhradnícke práce Poprad",
    "cemeteryName": "Cintorín pri Jazere Poprad",
    "customerName": "Martina Čierna",
    "address": "Lesná 45, Poprad",
    "description": "Hrob vedľa jazera blízko lesnej cesty.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Údržba zelene"
    ],
    "totalPrice": "200 eur",
    "status": "NotConfirmed",
    "deadline": "2024-09-30",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 20,
    "customerId": 1,
    "entrepreneurId": 7,
    "entrepreneurName": "Cintorínske služby Nitra",
    "cemeteryName": "Hlavný cintorín Nitra",
    "customerName": "Peter Malík",
    "address": "Dolná 5, Nitra",
    "description": "Rodinný hrob pri hlavnom vchode do cintorína.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov",
      "Odstraňovanie buriny"
    ],
    "totalPrice": "220 eur",
    "status": "NotConfirmed",
    "deadline": "2024-10-10",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 21,
    "customerId": 1,
    "entrepreneurId": 8,
    "entrepreneurName": "Záhradnícke práce Banská Bystrica",
    "cemeteryName": "Cintorín pod Dubom Banská Bystrica",
    "customerName": "Jana Kováčová",
    "address": "Námestie SNP 2, Banská Bystrica",
    "description": "Hrob pod veľkým dubom pri kaplnke.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "150 eur",
    "status": "NotConfirmed",
    "deadline": "2024-11-05",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 22,
    "customerId": 1,
    "entrepreneurId": 9,
    "entrepreneurName": "Komplexná starostlivosť Trenčín",
    "cemeteryName": "Juh Cintorín Trenčín",
    "customerName": "Tomáš Nový",
    "address": "Javorová 9, Trenčín",
    "description": "Hrob v tieni stromov na južnej strane cintorína.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "120 eur",
    "status": "NotConfirmed",
    "deadline": "2024-10-28",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 23,
    "customerId": 1,
    "entrepreneurId": 5,
    "entrepreneurName": "Cintorínske služby Prešov",
    "cemeteryName": "Kaplnkový cintorín Prešov",
    "customerName": "Lucia Bieliková",
    "address": "Lipová 44, Prešov",
    "description": "Hrob v rohu cintorína pri kaplnke.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Odstraňovanie buriny"
    ],
    "totalPrice": "180 eur",
    "status": "NotConfirmed",
    "deadline": "2024-11-20",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 24,
    "customerId": 1,
    "entrepreneurId": 3,
    "entrepreneurName": "Starostlivosť o pamiatky Levice",
    "cemeteryName": "Lesný cintorín Levice",
    "customerName": "František Jurík",
    "address": "Mlyny 32, Levice",
    "description": "Hrob pri lese blízko cintorínskej brány.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "210 eur",
    "status": "NotConfirmed",
    "deadline": "2024-12-02",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 25,
    "customerId": 1,
    "entrepreneurId": 4,
    "entrepreneurName": "Pamiatky Žilina",
    "cemeteryName": "Cintorín pod Horou Žilina",
    "customerName": "Gabriela Šebestová",
    "address": "Horská 8, Žilina",
    "description": "Rodinný hrob pod horou na západnej strane cintorína.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Údržba zelene"
    ],
    "totalPrice": "240 eur",
    "status": "NotConfirmed",
    "deadline": "2024-09-27",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 26,
    "customerId": 1,
    "entrepreneurId": 5,
    "entrepreneurName": "Cintorínske služby Bratislava",
    "cemeteryName": "Severný cintorín Bratislava",
    "customerName": "Michal Zeman",
    "address": "Poštová 14, Bratislava",
    "description": "Hrob pri hlavnom vchode na severnej strane cintorína.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Odstraňovanie buriny"
    ],
    "totalPrice": "200 eur",
    "status": "NotConfirmed",
    "deadline": "2024-10-05",
    "dateCompleted": null,
    "rating": null,
    "written_review": null
  },
  {
    "id": 27,
    "customerId": 1,
    "entrepreneurId": 11,
    "customerName": "Jozef Kokotny",
    "address": "Lesná 143, Liesek",
    "description": "Hrob blízko jazera, s výhľadom na les a ciernym krizikom.",
    "cemeteryName": "Cintorín Liesek",
    "entrepreneurName": "Pohrebné služby Liesek",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov",
      "Pokládka kvetín a vencov",
      "Lestenie náhrobných kameňov"
    ],
    "totalPrice": "190 eur",
    "status": "Completed",
    "IncludeInPortfolio": 6,
    "deadline": "2024-09-12",
    "dateCompleted": "2024-09-10",
    "rating": 3.5,
    "beforeImage": "images/orders/order14-before.jpg",
    "afterImage": "images/orders/order14-after.jpg",
    "written_review": "Fantastický výsledok, odporúčam všetkým az na nechatu travu okolo."
  },
  { //pending
    "id": 28,
    "customerId": 1,
    "entrepreneurId": 9,
    "customerName": "Anna Nováková",
    "address": "Záhradná 56, Bratislava",
    "description": "Hrob vedľa kaplnky, blízko centra mesta.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "120 eur",
    "status": "Pending",
    "IncludeInPortfolio": null,
    "deadline": "2024-10-01",
    "dateCompleted": null,
    "rating": null,
    "beforeImage": "images/orders/order15-before.jpg",
    "afterImage": null,
    "written_review": null
  },
  {
    "id": 29,
    "customerId": 1,
    "entrepreneurId": 6,
    "customerName": "Peter Pavlík",
    "address": "Dunajská 88, Nitra",
    "description": "Hrob na tichej strane cintorína, so stĺpovým náhrobkom.",
    "cemeteryName": "Cintorín Nitra",
    "entrepreneurName": "Pohrebné služby Levice",
    "selectedServices": [
      "Odstraňovanie buriny a machu",
      "Pokládka kvetín a vencov"
    ],
    "totalPrice": "150 eur",
    "status": "Completed",
    "IncludeInPortfolio": 6,
    "deadline": "2024-08-15",
    "dateCompleted": "2024-08-14",
    "rating": 4.8,
    "beforeImage": "/images/before-after/before-3.png",
    "afterImage": "/images/before-after/after-3.png",
    "written_review": "Skvelá práca, veľmi čistý a precízny výsledok."
  },
  {
    "id": 30,
    "customerId": 1,
    "entrepreneurId": 3,
    "customerName": "Mária Hrubá",
    "address": "Mierová 123, Košice",
    "description": "Hrob blízko brány, s veľkým náhrobným kameňom.",
    "cemeteryName": "Cintorín Košice",
    "entrepreneurName": "Pohrebné služby Prešov",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "100 eur",
    "status": "Completed",
    "IncludeInPortfolio": 7,
    "deadline": "2024-09-05",
    "dateCompleted": "2024-09-04",
    "rating": 4.0,
    "beforeImage": "/images/before-after/before-2.png",
    "afterImage": "/images/before-after/after-2.png",
    "written_review": "Spokojná s prácou, odporúčam."
  },
  {
    "id": 31,
    "customerId": 1,
    "entrepreneurId": 9,
    "customerName": "Martin Šimek",
    "address": "Slnečná 76, Trenčín",
    "description": "Hrob s vyvýšeným podstavcom, so starým náhrobným kameňom.",
    "cemeteryName": "Cintorín Trenčín",
    "entrepreneurName": "Cintorínske služby Poprad",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "180 eur",
    "status": "Completed",
    "IncludeInPortfolio": null,
    "deadline": "2024-10-15",
    "dateCompleted": "2024-09-04",
    "rating": 4.3,
    "beforeImage": "/images/before-after/before.png",
    "afterImage": "/images/before-after/after.png",
    "written_review": "Spokojná s prácou, odporúčam ds s sdds s dsd sds."
  },
  {
    "id": 32,
    "customerId": 1,
    "entrepreneurId": 9,
    "customerName": "Martin Šimek",
    "cemeteryName": "Cintorín Bratislava",
    "entrepreneurName": "Hrobová starostlivosť Bratislava",
    "address": "Slnečná 76, Trenčín",
    "description": "Hrob s vyvýšeným podstavcom, so starým náhrobným kameňom.",
    "selectedServices": [
      "Údržba a čistenie hrobu",
      "Pokládka kvetín a vencov",
      "Umývanie náhrobných kameňov"
    ],
    "totalPrice": "180 eur",
    "status": "Completed",
    "IncludeInPortfolio": null,
    "deadline": "2024-10-15",
    "dateCompleted": "2024-09-04",
    "rating": null,
    "beforeImage": "/images/before-after/before.png",
    "afterImage": "/images/before-after/after.png",
    "written_review": null
  }
];

// Poskytovateľ kontextu
export const OrderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);  // Stav načítavania
  const [error, setError] = useState(null);  // Stav chyby
  const [orders, setOrders] = useState(mockOrders);  // Použitie mock dát

  // Funkcia na načítanie všetkých objednávok
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Namiesto volania na server budeme používať mock data
      setOrders(mockOrders); // Uloženie objednávok do stavu
      setError(null); // Vyčistenie chýb
    } catch (err) {
      setError('Chyba pri načítavaní objednávok'); // Nastavenie chyby
    } finally {
      setLoading(false);
    }
  };

  const getNotConfirmedOrders = async () => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }

    const filteredOrders = orders.filter((order) => order.status === 'NotConfirmed');
    //console.log('NotConfirmed Orders:', filteredOrders);  // Log the filtered orders
    return filteredOrders;
  };

  const fetchPendingOrders = async () => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    return orders.filter((order) => order.status === 'pending');
  };

  const fetchWaitingOrders = async () => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    return orders.filter((order) => order.status === 'Notreviewed');
  };

  const fetchCompletedOrders = async () => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    return orders.filter((order) => order.status === 'Completed');
  };

  const fetchPortfolioOrders = async () => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    return orders.filter((order) => order.IncludeInPortfolio !== null);
  };

  // Funkcia na pridanie novej objednávky
  const addOrder = async (orderData) => {
    try {
      const newOrder = await createOrder(orderData);
      setOrders((prevOrders) => [...prevOrders, newOrder]);  // Pridanie novej objednávky
    } catch (err) {
      setError('Chyba pri vytváraní objednávky');
    }
  };

  // Funkcia na aktualizáciu objednávky
  const editOrder = async (orderId, updatedData) => {
    try {
      const updatedOrder = await updateOrder(orderId, updatedData);
      setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? updatedOrder : order)));  // Aktualizácia zoznamu objednávok
    } catch (err) {
      setError('Chyba pri aktualizácii objednávky');
    }
  };

  // Funkcia na zmazanie objednávky
  const removeOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));  // Zmazanie objednávky zo zoznamu
    } catch (err) {
      setError('Chyba pri mazání objednávky');
    }
  };

  const fetchCompletedOrdersByEntrepreneurId = async (entrepreneurId) => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    const completedOrders = orders.filter(
      (order) =>
        order.entrepreneurId === entrepreneurId && order.status === 'Completed'
    );
    return completedOrders;
  };

  const fetchByCustomerNotConfirmedId = async (customerId) => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    const completedOrders = orders.filter(
      (order) =>
        order.customerId === customerId && order.status === 'NotConfirmed'
    );
    console.log(completedOrders);
    return completedOrders;
  };

  const fetchByCustomerPendingId = async (customerId) => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    const completedOrders = orders.filter(
      (order) =>
        order.customerId === customerId && order.status === 'pending'
    );
    return completedOrders;
  };

  const fetchByCustomerCompletedId = async (customerId) => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    const completedOrders = orders.filter(
      (order) =>
        order.customerId === customerId && order.status === 'Completed'
    );
    return completedOrders;
  };

  const fetchByCustomerNotreviewedId = async (customerId) => {
    if (!orders || orders.length === 0) {
      await fetchOrders(); // Načítanie objednávok, ak ešte nie sú k dispozícii
    }
    const completedOrders = orders.filter(
      (order) =>
        order.customerId === customerId && order.status === 'Notreviewed'
    );
    return completedOrders;
  };

  
  // Načítanie objednávok po načítaní stránky
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
    value={{
      orders,
      loading,
      error,
      addOrder,
      editOrder,
      removeOrder,
      getNotConfirmedOrders, // Funkcia na potvrdené objednávky
      fetchPendingOrders, // Funkcia na nevybavené objednávky
      fetchCompletedOrders,
      fetchPortfolioOrders, // Funkcia na vybavené objednávky
      fetchCompletedOrdersByEntrepreneurId,
      fetchWaitingOrders,
      fetchByCustomerNotConfirmedId,
      fetchByCustomerPendingId,
      fetchByCustomerCompletedId,
      fetchByCustomerNotreviewedId,
    }}
  >
    {children}
  </OrderContext.Provider>
  );
};

// Hook na použitie OrderContext
export const useOrders = () => useContext(OrderContext);

