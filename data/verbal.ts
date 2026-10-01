export interface MCQ {
	question: string;
	options: [string, string, string, string];
	correctAnswer: string;
	reason: string;
}

export const mcqsArray1: MCQ[] = [
	{
		question: "Ali is 5 years old, and Sidra is twice his age. How old will Sidra be when Ali is 11?",
		options: ["16", "17", "20", "22"],
		correctAnswer: "16",
		reason: "Sidra is 5 years older than Ali, so she will be 11 + 5 = 16."
	},
	{
		question: "A boy is 3 years old, and his sister is three times his age. How old will she be when he is 11?",
		options: ["17", "19", "21", "33"],
		correctAnswer: "17",
		reason: "The sister is 6 years older than the boy, so she will be 11 + 6 = 17."
	},
	{
		question: "I am 10 years old, and my brother is twice my age. What will our age ratio be after 10 years?",
		options: ["2:3", "3:4", "1:2", "4:5"],
		correctAnswer: "2:3",
		reason: "After 10 years, the ages will be 20 and 30, which simplifies to 2:3."
	},
	{
		question: "Ali is 5 years old, and his sister is three times his age. How old will she be when Ali is 10?",
		options: ["15", "20", "25", "30"],
		correctAnswer: "20",
		reason: "The sister is 10 years older than Ali, so she will be 10 + 10 = 20."
	},
	{
		question: "Salman is 4 years old, and Ali is twice his age. How old will Ali be when Salman is 12?",
		options: ["16", "20", "24", "28"],
		correctAnswer: "16",
		reason: "Ali is 4 years older than Salman, so he will be 12 + 4 = 16."
	},
	{
		question: "Adil is 5 years old, and his sister is three times his age. How old will she be when Adil is 15?",
		options: ["20", "25", "30", "35"],
		correctAnswer: "25",
		reason: "The sister is 10 years older than Adil, so she will be 15 + 10 = 25."
	},
	{
		question: "A man walks north, turns left, and then turns right. Which direction is he facing?",
		options: ["North", "South", "East", "West"],
		correctAnswer: "North",
		reason: "From north, a left turn faces west; a right turn from west faces north."
	},
	{
		question: "Ali walks north, turns left, and then turns left again. Which direction is he facing?",
		options: ["North", "South", "East", "West"],
		correctAnswer: "South",
		reason: "Two consecutive left turns from north make him face south."
	},
	{
		question: "A man walks north, turns left, and then turns right. Which direction is he facing?",
		options: ["North", "South", "East", "West"],
		correctAnswer: "North",
		reason: "A left turn from north faces west, and a right turn from west faces north."
	},
	{
		question: "Ahmad walks north and then turns left. Which direction is he facing?",
		options: ["North", "South", "East", "West"],
		correctAnswer: "West",
		reason: "A left turn from north points west."
	},
	{
		question: "Adnan walks north and then south. He turns back and moves to his left. Which direction does he move?",
		options: ["North", "South", "East", "West"],
		correctAnswer: "West",
		reason: "After turning back from facing south, Adnan faces north; his left is west."
	},
	{
		question: "Frank is taller than John, and Ralph is taller than Frank. Who is the shortest?",
		options: ["Frank", "John", "Ralph", "Cannot be determined"],
		correctAnswer: "John",
		reason: "The height order is Ralph, Frank, then John."
	},
	{
		question: "Azhar was born in 2000 and Javed in 2005. Aslam is older than Javed but younger than Azhar. Who is oldest?",
		options: ["Azhar", "Javed", "Aslam", "They are the same age"],
		correctAnswer: "Azhar",
		reason: "Azhar was born first and is older than Aslam and Javed."
	},
	{
		question: "Ali is younger than Ahmad, and Yaqoob is older than Ahmad. Who is youngest?",
		options: ["Ali", "Ahmad", "Yaqoob", "Cannot be determined"],
		correctAnswer: "Ali",
		reason: "Ali is younger than both Ahmad and Yaqoob."
	},
	{
		question: "Which list correctly gives 90% of 90, 80% of 90, 80% of 80, 90% of 70, 60% of 9, and 80% of 10?",
		options: ["81, 72, 64, 63, 5.4, 8", "81, 72, 64, 63, 5.4, 10", "81, 72, 64, 70, 5.4, 8", "90, 80, 80, 70, 6, 10"],
		correctAnswer: "81, 72, 64, 63, 5.4, 8",
		reason: "Applying each percentage gives 81, 72, 64, 63, 5.4, and 8 respectively."
	},
	{
		question: "What is one third of 10% of 90?",
		options: ["3", "9", "30", "33"],
		correctAnswer: "3",
		reason: "10% of 90 is 9, and one third of 9 is 3."
	},
	{
		question: "What is one third of 10% of 120?",
		options: ["4", "12", "30", "40"],
		correctAnswer: "4",
		reason: "10% of 120 is 12, and one third of 12 is 4."
	},
	{
		question: "Out of 500 students, 360 are boys. What percentage are girls?",
		options: ["18%", "28%", "36%", "72%"],
		correctAnswer: "28%",
		reason: "There are 140 girls; 140 ÷ 500 × 100 = 28%."
	},
	{
		question: "There are 30 passengers on a bus, and two thirds are men. What percentage are women?",
		options: ["25%", "30%", "33.33%", "66.67%"],
		correctAnswer: "33.33%",
		reason: "One third of the passengers are women, which is 33.33%."
	},
	{
		question: "In a class of 500 students, 340 are boys. What percentage are boys?",
		options: ["32%", "64%", "68%", "72%"],
		correctAnswer: "68%",
		reason: "340 ÷ 500 × 100 = 68%."
	},
	{
		question: "Out of 1,500 students, 1,200 are present. What percentage are absent?",
		options: ["15%", "20%", "25%", "80%"],
		correctAnswer: "20%",
		reason: "300 are absent; 300 ÷ 1,500 × 100 = 20%."
	},
	{
		question: "Out of 1,500 students, 1,200 are present. What percentage are present?",
		options: ["20%", "60%", "80%", "90%"],
		correctAnswer: "80%",
		reason: "1,200 ÷ 1,500 × 100 = 80%."
	},
	{
		question: "Out of 500 students, 340 are present. What percentage are absent?",
		options: ["32%", "34%", "68%", "72%"],
		correctAnswer: "32%",
		reason: "160 are absent; 160 ÷ 500 × 100 = 32%."
	},
	{
		question: "Which of these words looks the same in a vertical mirror?",
		options: ["TITITIT", "TILITIT", "TITLITI", "TIIITLT"],
		correctAnswer: "TITITIT",
		reason: "The letters T and I are vertically symmetrical, and TITITIT reads the same in reverse."
	},
	{
		question: "Complete the series: 115, 55, 170, 65, 235, ?",
		options: ["70", "75", "80", "85"],
		correctAnswer: "75",
		reason: "Reading the even-position terms gives 55, 65, 75, increasing by 10."
	},
	{
		question: "Complete the series: 66, 63, 57, 45, ?",
		options: ["21", "24", "27", "30"],
		correctAnswer: "24",
		reason: "The successive decreases are 3, 6, 12, and 21, with those decreases growing by 3, 6, and 9; the source answer is 24."
	},
	{
		question: "Complete the series: 2, 6, 14, 30, 62, ?",
		options: ["94", "112", "124", "126"],
		correctAnswer: "126",
		reason: "Each term is twice the previous term plus 2: 62 × 2 + 2 = 126."
	},
	{
		question: "What comes next: 3, 7, 14, 18, 36, 40, ?",
		options: ["44", "72", "76", "80"],
		correctAnswer: "80",
		reason: "The pattern alternates adding 4 and multiplying by 2; 40 × 2 = 80."
	},
	{
		question: "What is one quarter of one tenth of 120?",
		options: ["3", "12", "30", "40"],
		correctAnswer: "3",
		reason: "One tenth of 120 is 12, and one quarter of 12 is 3."
	},
	{
		question: "What is one quarter of 120?",
		options: ["20", "30", "40", "60"],
		correctAnswer: "30",
		reason: "120 ÷ 4 = 30."
	},
	{
		question: "What is one tenth of 90?",
		options: ["0.9", "9", "10", "90"],
		correctAnswer: "9",
		reason: "90 ÷ 10 = 9."
	},
	{
		question: "What is one tenth of 120?",
		options: ["1.2", "12", "20", "120"],
		correctAnswer: "12",
		reason: "120 ÷ 10 = 12."
	},
	{
		question: "What is one third of 120?",
		options: ["30", "40", "60", "90"],
		correctAnswer: "40",
		reason: "120 ÷ 3 = 40."
	},
	{
		question: "What is 120 × 7?",
		options: ["720", "840", "860", "940"],
		correctAnswer: "840",
		reason: "120 × 7 = 840."
	},
	{
		question: "Evaluate 2(2 + 2).",
		options: ["6", "8", "10", "12"],
		correctAnswer: "8",
		reason: "First calculate 2 + 2 = 4, then 2 × 4 = 8."
	},
	{
		question: "What is half of a quarter?",
		options: ["1/4", "1/6", "1/8", "1/10"],
		correctAnswer: "1/8",
		reason: "Half of 1/4 is 1/8."
	},
	{
		question: "Complete the alphabetical series: B, E, J, Q, ?",
		options: ["X", "Y", "Z", "A"],
		correctAnswer: "Z",
		reason: "The letter positions increase by 3, 5, 7, then 9; the next letter after Q is Z."
	},
	{
		question: "Complete the alphabetical series: A, C, F, J, O, ?",
		options: ["T", "U", "V", "W"],
		correctAnswer: "U",
		reason: "The letter positions increase by 2, 3, 4, 5, then 6; O + 6 is U."
	},
	{
		question: "Complete the alphabetical series: L, M, N, ?",
		options: ["O", "P", "Q", "R"],
		correctAnswer: "O",
		reason: "The letters proceed alphabetically, so O follows N."
	},
	{
		question: "If z = 2 and x = 5, what value is assigned to u?",
		options: ["7", "8", "9", "10"],
		correctAnswer: "9",
		reason: "Moving backward through the alphabet, the assigned values increase by 1: z=2, y=3, x=5 (as given); the source gives u=9."
	},
	{
		question: "Continue the pattern: z=3, x=5, v=7, t=9, ...",
		options: ["r=10", "r=11", "s=10", "q=11"],
		correctAnswer: "r=11",
		reason: "The letters move back by two and the values increase by two, so the next pair is r=11."
	},
	{
		question: "What is the next letter in the series A, E, K, ?",
		options: ["P", "Q", "R", "S"],
		correctAnswer: "S",
		reason: "The letter positions increase by 4, 6, then 8; K + 8 is S."
	},
	{
		question: "Complete the pattern: AB/A, BC/B, CD/C, ?",
		options: ["DE/D", "EF/E", "DE/E", "CD/D"],
		correctAnswer: "DE/D",
		reason: "Each pair advances one letter, and the letter after the slash is the first letter of that pair."
	},
	{
		question: "Complete the alphabetical series: H, F, D, ?",
		options: ["A", "B", "C", "E"],
		correctAnswer: "B",
		reason: "The series moves backward by two letters each time: H, F, D, B."
	},
	{
		question: "Complete the alphabetical series: J, H, F, D, ...",
		options: ["A", "B", "C", "E"],
		correctAnswer: "B",
		reason: "The series moves backward by two letters each time, so B follows D."
	},
	{
		question: "What is the next letter in the series A, E, K, ...?",
		options: ["P", "Q", "R", "S"],
		correctAnswer: "R",
		reason: "The source answer is R."
	},
	{
		question: "How many months have 31 days?",
		options: ["5", "6", "7", "8"],
		correctAnswer: "7",
		reason: "January, March, May, July, August, October, and December have 31 days."
	},
	{
		question: "How often does a leap year generally occur?",
		options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
		correctAnswer: "Every 4 years",
		reason: "A leap day is generally added every four years to account for the extra hours in a calendar year."
	},
	{
		question: "If yesterday was Sunday, what day will it be the day after tomorrow?",
		options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
		correctAnswer: "Wednesday",
		reason: "If yesterday was Sunday, today is Monday; the day after tomorrow is Wednesday."
	},
	{
		question: "If yesterday was Friday, what day will tomorrow be?",
		options: ["Saturday", "Sunday", "Monday", "Tuesday"],
		correctAnswer: "Sunday",
		reason: "If yesterday was Friday, today is Saturday and tomorrow is Sunday."
	},
	{
		question: "If the 28th day of a month is Sunday, what day is the 2nd day?",
		options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
		correctAnswer: "Tuesday",
		reason: "The 2nd is 26 days before the 28th; 26 days is five days modulo seven, so it is Tuesday."
	},
	{
		question: "If the 4th day of a month is Tuesday, what day is the 26th?",
		options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
		correctAnswer: "Wednesday",
		reason: "The 26th is 22 days after the 4th; 22 days is one day beyond three full weeks."
	},
	{
		question: "If the 4th day of a month is Sunday, what day is the 19th?",
		options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
		correctAnswer: "Monday",
		reason: "The 19th is 15 days after the 4th; 15 days is one day beyond two weeks."
	},
	{
		question: "If the 14th day of a month is Sunday, what day is the 4th?",
		options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
		correctAnswer: "Thursday",
		reason: "The 4th is 10 days before Sunday; moving back 10 days gives Thursday."
	},
	{
		question: "If the 1st day of a month is Monday, what day is the 12th?",
		options: ["Thursday", "Friday", "Saturday", "Sunday"],
		correctAnswer: "Saturday",
		reason: "The source answer key gives Saturday."
	},
	{
		question: "If the 2nd day of a month is Monday, what day is the 12th?",
		options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
		correctAnswer: "Thursday",
		reason: "The 12th is 10 days after Monday, which is Thursday."
	},
	{
		question: "If the 2nd day of a month is Sunday, what day is the 23rd?",
		options: ["Friday", "Saturday", "Sunday", "Monday"],
		correctAnswer: "Sunday",
		reason: "The 23rd is 21 days after the 2nd, exactly three weeks later."
	},
	{
		question: "If the 15th day of a month is Monday, what day is the 4th?",
		options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
		correctAnswer: "Thursday",
		reason: "The 4th is 11 days before Monday, which is Thursday."
	},
	{
		question: "If the 2nd day of a month is Friday, what day is the 23rd?",
		options: ["Wednesday", "Thursday", "Friday", "Saturday"],
		correctAnswer: "Friday",
		reason: "The 23rd is 21 days after the 2nd, exactly three weeks later."
	},
	{
		question: "If the 4th day of a month is Sunday, what day is the 14th?",
		options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
		correctAnswer: "Wednesday",
		reason: "The 14th is 10 days after Sunday, which is Wednesday."
	},
	{
		question: "If a dozen pencils cost Rs 27, what is the cost of 4 pencils?",
		options: ["Rs 6", "Rs 9", "Rs 12", "Rs 18"],
		correctAnswer: "Rs 9",
		reason: "Each pencil costs Rs 27 ÷ 12 = Rs 2.25, so 4 cost Rs 9."
	},
	{
		question: "If a dozen pencils cost Rs 60, what is the cost of 5 pencils?",
		options: ["Rs 20", "Rs 25", "Rs 30", "Rs 35"],
		correctAnswer: "Rs 25",
		reason: "Each pencil costs Rs 60 ÷ 12 = Rs 5, so 5 cost Rs 25."
	},
	{
		question: "If my brother's sister is your mother, what is my relation to you?",
		options: ["Father", "Uncle", "Brother", "Cousin"],
		correctAnswer: "Uncle",
		reason: "My brother's sister is my sister; if she is your mother, I am your uncle."
	},
	{
		question: "My brother's son's sister is my ...",
		options: ["Niece", "Aunt", "Cousin", "Granddaughter"],
		correctAnswer: "Niece",
		reason: "The sister of my brother's son is my brother's daughter, my niece."
	},
	{
		question: "My sister is your mother. What is your relation to me?",
		options: ["Nephew or niece", "Uncle or aunt", "Brother or sister", "Cousin"],
		correctAnswer: "Nephew or niece",
		reason: "A sister's child is her sibling's nephew or niece."
	},
	{
		question: "A is the father of B, but B is not A's son. What is B's relation to A?",
		options: ["Daughter", "Sister", "Mother", "Aunt"],
		correctAnswer: "Daughter",
		reason: "If B is A's child but not his son, B is his daughter."
	},
	{
		question: "A train travels at twice a car's speed. If the car covers 60 km in one hour, how far does the train travel in 30 minutes?",
		options: ["30 km", "45 km", "60 km", "120 km"],
		correctAnswer: "60 km",
		reason: "The train travels at 120 km/h, so in half an hour it covers 60 km."
	},
	{
		question: "A train travels at twice a car's speed. If the car covers 30 km in one hour, how far does the train travel in 30 minutes?",
		options: ["15 km", "30 km", "45 km", "60 km"],
		correctAnswer: "30 km",
		reason: "The train travels at 60 km/h, so in half an hour it covers 30 km."
	},
	{
		question: "A train travels at 90 km/h. How far does it travel in 12 minutes?",
		options: ["12 km", "18 km", "20 km", "24 km"],
		correctAnswer: "18 km",
		reason: "12 minutes is 0.2 hours; 90 × 0.2 = 18 km."
	},
	{
		question: "A helicopter uses 50 gallons to travel 320 km. How many gallons will it use to travel 400 km at the same rate?",
		options: ["60 gallons", "62.5 gallons", "65 gallons", "75 gallons"],
		correctAnswer: "62.5 gallons",
		reason: "Fuel use is proportional to distance: 50 × 400 ÷ 320 = 62.5 gallons."
	},
	{
		question: "A man walks 20 km in 1 hour 40 minutes. How long does it take him to cover 1 km?",
		options: ["4 minutes", "5 minutes", "6 minutes", "8 minutes"],
		correctAnswer: "5 minutes",
		reason: "100 minutes ÷ 20 km = 5 minutes per kilometer."
	},
	{
		question: "A bus travels at 60 km/h, and a train travels at twice that speed. How far does the train travel in 30 minutes?",
		options: ["30 km", "45 km", "60 km", "120 km"],
		correctAnswer: "60 km",
		reason: "The train travels at 120 km/h, so in half an hour it covers 60 km."
	},
	{
		question: "Ali buys a pen for Rs 30 and sells it for Rs 40. What is his profit percentage?",
		options: ["25%", "30%", "33.33%", "40%"],
		correctAnswer: "33.33%",
		reason: "Profit is Rs 10; Rs 10 ÷ Rs 30 × 100 = 33.33%."
	},
	{
		question: "A person buys a book for Rs 500 and sells it for Rs 700. What is the profit percentage?",
		options: ["20%", "30%", "40%", "50%"],
		correctAnswer: "40%",
		reason: "Profit is Rs 200; Rs 200 ÷ Rs 500 × 100 = 40%."
	},
	{
		question: "A bat cannot see. What can a snake not do, according to the analogy?",
		options: ["Hear", "Move", "Breathe", "Sleep"],
		correctAnswer: "Hear",
		reason: "The source gives hear as the matching answer."
	},
	{
		question: "Which item is different from the others: angle, rectangle, square, hexagon?",
		options: ["Angle", "Rectangle", "Square", "Hexagon"],
		correctAnswer: "Angle",
		reason: "A rectangle, square, and hexagon are polygons; an angle is not a polygon."
	},
	{
		question: "Which item is different from the others: cricket, football, tennis, baseball?",
		options: ["Cricket", "Football", "Tennis", "Baseball"],
		correctAnswer: "Football",
		reason: "The source answer identifies football as the odd one out."
	},
	{
		question: "Which item is different from the others: wheat, hay, rice, maize?",
		options: ["Wheat", "Hay", "Rice", "Maize"],
		correctAnswer: "Hay",
		reason: "Hay is dried grass or fodder, while wheat, rice, and maize are grain crops."
	},
	{
		question: "Which item is different from the others: monkey, ape, chimpanzee, panda?",
		options: ["Monkey", "Ape", "Chimpanzee", "Panda"],
		correctAnswer: "Panda",
		reason: "Panda is not a primate; the other animals are primates."
	},
	{
		question: "Which item is different from the others: America, Africa, Asia, Euro?",
		options: ["America", "Africa", "Asia", "Euro"],
		correctAnswer: "Euro",
		reason: "Euro is a currency name; the other choices refer to continents."
	},
	{
		question: "What is the sound of an eagle called?",
		options: ["Scream", "Bark", "Neigh", "Moo"],
		correctAnswer: "Scream",
		reason: "An eagle's call is commonly described as a scream."
	},
	{
		question: "An airplane flies due to ...",
		options: ["Lift", "Friction", "Magnetism", "Sound"],
		correctAnswer: "Lift",
		reason: "The aerodynamic force of lift helps an airplane stay airborne."
	},
	{
		question: "Vehicle is to wheels as sound is to ...",
		options: ["Waves", "Light", "Airplanes", "Echoes"],
		correctAnswer: "Waves",
		reason: "Wheels are associated with a vehicle, just as waves are associated with sound."
	},
	{
		question: "Dog is to bitch as horse is to ...",
		options: ["Mare", "Foal", "Stallion", "Colt"],
		correctAnswer: "Mare",
		reason: "Bitch is the female term for a dog; mare is the female term for a horse."
	},
	{
		question: "What is 20% of one tenth of 90?",
		options: ["0.9", "1.8", "9", "18"],
		correctAnswer: "1.8",
		reason: "One tenth of 90 is 9, and 20% of 9 is 1.8."
	},
	{
		question: "What is half of 9/90?",
		options: ["1/10", "1/20 or 0.05", "1/5", "1/2"],
		correctAnswer: "1/20 or 0.05",
		reason: "Half of 9/90 is 9/180, which simplifies to 1/20 or 0.05."
	},
	{
		question: "Evaluate 1 + 2/2.",
		options: ["1.5", "2", "2.5", "3"],
		correctAnswer: "2",
		reason: "Division comes first: 2/2 = 1, then 1 + 1 = 2."
	},
	{
		question: "If a dozen eggs cost Rs 24, what is the cost of 7 eggs?",
		options: ["Rs 7", "Rs 12", "Rs 14", "Rs 18"],
		correctAnswer: "Rs 14",
		reason: "Each egg costs Rs 2, so 7 eggs cost Rs 14."
	},
	{
		question: "If a dozen pencils cost Rs 15, what is the cost of 72 pencils?",
		options: ["Rs 75", "Rs 90", "Rs 105", "Rs 120"],
		correctAnswer: "Rs 90",
		reason: "72 pencils are 6 dozen, and 6 × Rs 15 = Rs 90."
	},
	{
		question: "Parents give education to their children to ...",
		options: ["Groom them", "Get knowledge", "Kill germs", "Travel"],
		correctAnswer: "Groom them",
		reason: "The provided PDF answer key says education is given to groom children."
	},
	{
		question: "Why do we boil milk?",
		options: ["To get knowledge", "To kill germs", "To travel", "For shopping"],
		correctAnswer: "To kill germs",
		reason: "The provided PDF answer key says milk is boiled to kill germs."
	},
	{
		question: "Why do people read newspapers?",
		options: ["To get knowledge", "To kill germs", "To travel", "For eyesight"],
		correctAnswer: "To get knowledge",
		reason: "The provided PDF answer key says people read newspapers to get knowledge."
	},
	{
		question: "Why do people use cars?",
		options: ["To get knowledge", "To kill germs", "To travel", "For shopping"],
		correctAnswer: "To travel",
		reason: "The provided PDF answer key says people use cars to travel."
	},
	{
		question: "Why do girls wear glasses, according to the PDF?",
		options: ["For shopping", "For eyesight", "To travel", "To get knowledge"],
		correctAnswer: "For eyesight",
		reason: "The provided PDF answer key gives eyesight as the reason."
	},
	{
		question: "Why do women go to the bazaar, according to the PDF?",
		options: ["For eyesight", "To travel", "For shopping", "To get knowledge"],
		correctAnswer: "For shopping",
		reason: "The provided PDF answer key gives shopping as the reason."
	},
	{
		question: "What is the last letter of UTYEAB after arranging its letters alphabetically?",
		options: ["A", "B", "T", "Y"],
		correctAnswer: "Y",
		reason: "The letters arranged alphabetically are A, B, E, T, U, Y."
	},
	{
		question: "What is the third letter in MANAGEMENT when its letters are arranged alphabetically?",
		options: ["A", "E", "G", "M"],
		correctAnswer: "G",
		reason: "The provided PDF answer key gives G for this item."
	},
	{
		question: "What is the second letter when AUGMENTED is arranged alphabetically?",
		options: ["A", "D", "E", "G"],
		correctAnswer: "E",
		reason: "The provided PDF answer key gives E for this item."
	},
	{
		question: "Rapis rearranges to Paris. What category does Paris belong to?",
		options: ["Country", "City", "Ocean", "State"],
		correctAnswer: "City",
		reason: "Paris is a city."
	},
	{
		question: "Arrange OPERALD to form LEOPARD. What category does it belong to?",
		options: ["Country", "City", "Ocean", "Wild animal"],
		correctAnswer: "Wild animal",
		reason: "LEOPARD is a wild animal."
	},
	{
		question: "Which item does not belong: Lahore, Rawalpindi, Karachi, Sindh, Quetta?",
		options: ["Lahore", "Rawalpindi", "Sindh", "Quetta"],
		correctAnswer: "Sindh",
		reason: "Sindh is a province; the other choices are cities."
	},
	{
		question: "Cold is to ice as hot is to ...",
		options: ["Steam", "Snow", "Water", "Rain"],
		correctAnswer: "Steam",
		reason: "Ice is associated with cold; steam is associated with heat."
	},
	{
		question: "Which item does not belong: cow, dog, leopard, cat?",
		options: ["Cow", "Dog", "Leopard", "Cat"],
		correctAnswer: "Cow",
		reason: "The provided PDF answer key identifies cow as the odd item."
	},
	{
		question: "Rearrange E.H.M.O.R.T to form a word.",
		options: ["Mother", "Thermo", "Remote", "Other"],
		correctAnswer: "Mother",
		reason: "The letters rearrange to spell MOTHER."
	},
	{
		question: "Which word comes first in dictionary order: MOUNTAIN, MARGALLA, MACHINE?",
		options: ["Mountain", "Margalla", "Machine", "None of these"],
		correctAnswer: "Machine",
		reason: "Machine comes first alphabetically because its second letter, A, precedes O and A is followed by C before R."
	},
	{
		question: "If one man writes 5 papers in 5 minutes, how long does one man take to write 1 paper?",
		options: ["1 minute", "2 minutes", "5 minutes", "10 minutes"],
		correctAnswer: "1 minute",
		reason: "At the same rate, writing one fifth as many papers takes one fifth as long: 1 minute."
	},
	{
		question: "There are 30 passengers on a bus and two thirds are men. How many women are there?",
		options: ["5", "10", "15", "20"],
		correctAnswer: "10",
		reason: "One third of 30 passengers are women, which is 10."
	},
	{
		question: "Amjad and Ahmad have 24 balls. Amjad has three times as many as Ahmad. How many does Ahmad have, according to the PDF?",
		options: ["4", "6", "8", "18"],
		correctAnswer: "6",
		reason: "The provided PDF answer key gives 6."
	},
	{
		question: "If 5 men write 5 pages in 5 minutes, how long does 1 man take to write 1 page?",
		options: ["1 minute", "2 minutes", "5 minutes", "10 minutes"],
		correctAnswer: "5 minutes",
		reason: "At that rate, each man writes one page in 5 minutes."
	},
	{
		question: "If 10 men dig a well in 5 days, how many days will 5 men take at the same rate?",
		options: ["5", "10", "15", "20"],
		correctAnswer: "10",
		reason: "Half as many workers take twice as long: 10 days."
	}
];
