export interface MCQ {
	question: string;
	options: [string, string, string, string];
	correctAnswer: string;
	reason: string;
}

export type MCQRow = [question: string, answer: string, reason?: string];

type AnswerCategory =
	| "year" | "date" | "compound" | "count" | "fraction" | "ratio" | "direction" | "math" | "country" | "country-list" | "person" | "person-list"
	| "capital" | "city" | "province" | "district" | "region" | "river" | "mountain" | "mineral" | "sea" | "lake" | "island" | "headquarters" | "facility" | "cantonment" | "rank" | "religion" | "landmark" | "award" | "event" | "constitution"
	| "currency" | "denomination" | "language" | "organization" | "body" | "party" | "school" | "book" | "field" | "sense" | "agreement" | "legislation" | "function" | "role" | "issue" | "platform" | "weekday" | "ordinal" | "letter" | "spelling" | "transformation" | "antonym" | "synonym" | "reason" | "sound" | "sport" | "activity" | "motto" | "numeric-list" | "alias" | "definition" | "sequence" | "mirror" | "grammar" | "article" | "place" | "general";

const categoryFor = (question: string, answer: string): AnswerCategory => {
	const normalized = question.toLowerCase();
	if (/\b(cos|sin|tan|triangle|matrix|quadratic|angle|determinant|eccentricity|straight line|roots|integral|differentiat)\b/.test(normalized)) return "math";
	if (/_{2,}|\bfill in the blank\b/.test(normalized)) return "grammar";
	if (/\bwho\b/.test(normalized)) return /,|\band\b|\bor\b/.test(answer) ? "person-list" : "person";
	if (/^(?:\d+(?:st|nd|rd|th)|first|second|third|fourth|fifth|ninth)$/i.test(answer.trim())) return "ordinal";
	if (/\bname and year\b/.test(normalized)) return "compound";
	if (/\b(?:in which|which|what) year\b|\bin what year\b/.test(normalized)) return "year";
	if (/\b(?:on what date|which date|what date)\b/.test(normalized)) return "date";
	if (/^\s*when\b/.test(normalized) && !/\bhow (?:many|much|old)\b/.test(normalized)) {
		return /^\s*(?:18|19|20|21)\d{2}\s*$/.test(answer) ? "year" : "date";
	}
	if (/\bwith which country\b/.test(normalized)) return "country";
	if (/\bhow many\b|\bhow much\b|\bhow old\b|\bhow often\b|\bhow far\b|\bwhat is the number of\b|\btenure\b|\bhow long\b|\blength\b|\btemperature scale\b|\babsolute zero\b|\btotal number\b|\bnumber of\b|\bpercentage\b|\bwhat percent\b|\btoll\b/.test(normalized)) return "count";
	if (/\bwhat is (?:one|a) (?:quarter|half|tenth)\b|\bquarter of\b|\bhalf of\b/.test(normalized) && /^\d+(?:\.\d+)?$/.test(answer.trim())) return "count";
	if (/\bevaluate\b|\bcalculate\b/.test(normalized)) return "count";
	if (/\byesterday\b|\btomorrow\b|\bwhat day\b/.test(normalized)) return "weekday";
	if (/\b\d+\s*\/\s*\d+/.test(normalized) && /\b(?:minus|plus|add|subtract|sum|difference)\b/.test(normalized)) return "fraction";
	if (/\bhalf\b|\bquarter\b|\bfraction\b/.test(normalized)) return "fraction";
	if (/\bcomplete the series\b|\bcomplete the sequence\b/.test(normalized)) return "sequence";
	if (/\bwhich list\b|\b(?:percent|percentage) of\b/.test(normalized)) return "numeric-list";
	if (/\bratio\b/.test(normalized)) return "ratio";
	if (/\bfacing\b|\bwhich direction\b|\bwhat direction\b/.test(normalized)) return "direction";
	if (/\b(?:which|what)\s+(?:number|numbered)\b|\bwhich-number\b/.test(normalized)) return "ordinal";
	if (/\bthird letter\b|\bwhich letter\b|\bwhat letter\b/.test(normalized)) return "letter";
	if (/\bhow do you spell\b|\bspelling\b/.test(normalized)) return "spelling";
	if (/\breported speech\b|\bpassive voice\b|\bchange to (?:reported|passive)\b/.test(normalized)) return "transformation";
	if (/\bantonym\b/.test(normalized)) return "antonym";
	if (/\b(?:synonym|closest meaning|meaning of)\b/.test(normalized)) return "synonym";
	if (/\bvertical mirror\b|\bmirror image\b/.test(normalized)) return "mirror";
	if (/\bsound of\b|\bcall of\b/.test(normalized)) return "sound";
	if (/^\s*why\b/.test(normalized)) return "reason";
	if (/\bconstitution\b/.test(normalized)) return "constitution";
	if (/\bwhich sense\b|\bwhat sense\b/.test(normalized)) return "sense";
	if (/\bstudy of\b|\bfield of study\b/.test(normalized)) return "field";
	if (/\baward\b|\bmedal\b|\bnishan-e\b/.test(normalized)) return "award";
	if (/\bwar of independence\b|\bbattle of\b|\bwar\b/.test(normalized)) return "event";
	if (/\bagreement\b|\bpact\b|\btreaty\b/.test(normalized)) return "agreement";
	if (/\bwhich act\b|\bwhat act\b|\bact led to\b/.test(normalized)) return "legislation";
	if (/\bwhat does .+ regulate\b|\bwhat does .+ control\b/.test(normalized)) return "function";
	if (/\bwhich body\b|\bwhat body\b/.test(normalized)) return "body";
	if (/\bpolitical party\b|\bwhich party\b/.test(normalized)) return "party";
	if (/\bnursery school\b|\bwhich school\b|\bwhich (?:college|university)\b/.test(normalized)) return "school";
	if (/\bwhich issue\b|\bwhat issue\b|\bworked on\b/.test(normalized)) return "issue";
	if (/\bwhat office\b|\boffice did .+ hold\b|\bwhich office\b/.test(normalized)) return "role";
	if (/\breal name\b|\bto whom\b|\bmarried\b|\bwhich woman\b|\bwhich man\b/.test(normalized)) return "person";
	if (/\bmother\b|\bfather\b|\bwife\b|\bhusband\b|\bson\b|\bdaughter\b/.test(normalized)) return "person";
	if (/\bbook\b|\bnovel\b|\bwhich work\b/.test(normalized)) return "book";
	if (/\bemperor\b|\bruler\b/.test(normalized)) return "person";
	if (/\bteam\b|\bfootball world cup\b|\bfifa world cup\b/.test(normalized)) return "country";
	if (/\bapp\b|\bsocial media platform\b/.test(normalized)) return "platform";
	if (/\broute\b.*\b(?:also called|called)\b|\balso called\b/.test(normalized)) return "alias";
	if (/\bword\b.*\bmeaning\b|\bword\b.*\bmean\b/.test(normalized)) return "definition";
	if (/\bplayer\b|\btest wickets\b/.test(normalized)) return "person";
	if (/\bcricket\b/.test(normalized)) return "sport";
	if (/\b(?:which|what)\s+(?:two|three|four)\s+countries\b/.test(normalized)) return "country-list";
	if (/\bcountry\b|\bnation\b|\bwith which country\b/.test(normalized)) return "country";
	if (/\barticles?\b/.test(normalized)) return "article";
	if (/\bcapital\b/.test(normalized)) return "capital";
	if (/\breligion\b|\bwhich faith\b/.test(normalized)) return "religion";
	if (/\blandmark\b|\bwhich landmark\b/.test(normalized) || (/\bnote\b/.test(normalized) && /\bpictured\b/.test(normalized))) return "landmark";
	if (/\bheadquarters\b/.test(normalized)) return "headquarters";
	if (/\bcantonment\b|\bchaa?oni\b/.test(normalized)) return "cantonment";
	if (/\bair ?base\b|\bnaval base\b|\bmilitary base\b|\btank manufacturing\b|\bmilitary vehicle\b/.test(normalized)) return "facility";
	if (/\bequal in rank\b|\bwhich army rank\b|\bmilitary rank\b/.test(normalized)) return "rank";
	if (/\bmotto\b/.test(normalized)) return "motto";
	if (/\bwatersports? activity\b|\bwhich activity\b/.test(normalized)) return "activity";
	if (/\briver\b|\bon (?:which )?river\b|\bis on\??$|\b(?:flow|flows|flowing) from\b/.test(normalized)) return "river";
	if (/\bmountain range\b|\bwhich range\b/.test(normalized)) return "mountain";
	if (/\bmineral\b/.test(normalized)) return "mineral";
	if (/\bprovince\b/.test(normalized)) return "province";
	if (/\bdistrict\b/.test(normalized)) return "district";
	if (/\bregion\b/.test(normalized)) return "region";
	if (/\bprovince\b|\bformer name\b/.test(normalized)) return "province";
	if (/\bcity\b|\btown\b|\bold name\b/.test(normalized)) return "city";
	if (/\bsea\b/.test(normalized)) return "sea";
	if (/\blake\b/.test(normalized)) return "lake";
	if (/\bisland\b/.test(normalized)) return "island";
	if (/\bdenomination\b|\bcurrency note\b|\bbanknote\b/.test(normalized)) return "denomination";
	if (/\bcurrency\b/.test(normalized)) return "currency";
	if (/\blanguage\b/.test(normalized)) return "language";
	if (/\b(?:organization|organisation|agency|institution|institute|company|complex)\b|\bstand for\b/.test(normalized)) return "organization";
	if (/\bsport\b|\bwhich game\b/.test(normalized)) return "sport";
	if (/^\s*where\b|\bwhere is\b/.test(normalized)) return "place";
	if (/^\s*(?:what|which)\b/.test(normalized) && /^\s*\d+(?:[.,]\d+)?(?:\s|$)/.test(answer)) return "count";
	return "general";
};

const normalizeAnswer = (category: AnswerCategory, answer: string): string => {
	const trimmed = answer.trim();
	if (category === "ordinal") {
		const ordinalWords: Record<string, string> = { first: "1st", second: "2nd", third: "3rd", fourth: "4th", fifth: "5th", ninth: "9th" };
		return ordinalWords[trimmed.toLowerCase()] ?? trimmed;
	}
	if (category === "year") {
		const eraYear = trimmed.match(/^\s*(\d{1,4}\s*(?:AH|Hijri|CE|AD|BCE|BC))\b/i);
		if (eraYear) return eraYear[1].replace(/\s+/g, " ");
		const year = trimmed.match(/\b(?:18|19|20|21)\d{2}\b/);
		return year?.[0] ?? trimmed;
	}
	if (category === "count") {
		const prismFaces = trimmed.match(/\bn\s*\+\s*(\d+)\s+faces?\b/i);
		if (prismFaces) return `n + ${prismFaces[1]} faces`;
		if (/^infinitely many$/i.test(trimmed)) return "∞";
		const frequencyCount = trimmed.match(/^(?:every|once every)\s+(\d+(?:[.,]\d+)?\s*(?:years?|months?|days?))$/i);
		if (frequencyCount) return frequencyCount[1];
		const approximateCount = trimmed.match(/^(?:over|more than|approximately|about)\s+(\d+(?:[.,]\d+)?)(.*)$/i);
		if (approximateCount) return `${approximateCount[1]}+${approximateCount[2]}`;
		const numberWords: Record<string, string> = { one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12" };
		const wordCount = trimmed.match(/^(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)(?:\s+(times?|years?|months?|days?|articles?))?$/i);
		if (wordCount) return `${numberWords[wordCount[1].toLowerCase()]}${wordCount[2] ? ` ${wordCount[2]}` : ""}`;
		const numeric = trimmed.match(/^\s*(-?\d+(?:[.,]\d+)?)(?:\s*(years?|months?|days?|times?|minutes?|hours?|seats?|members?|km|kilomet(?:er|re)s?|%|°c?))?/i);
		if (numeric) return `${numeric[1]}${numeric[2] ? ` ${numeric[2]}` : ""}`;
	}
	if (category === "fraction") {
		const fraction = trimmed.match(/^(\d+)\s*\/\s*(\d+)$/);
		if (fraction) return `${fraction[1]}/${fraction[2]}`;
	}
	if (category === "country") return trimmed.replace(/\s*\([^)]*\)\s*$/, "").trim();
	return trimmed;
};

const isCompatibleAnswer = (category: AnswerCategory, correct: string, candidate: string): boolean => {
	if (category === "year") {
		const era = correct.match(/\b(AH|Hijri|CE|AD|BCE|BC)\b/i)?.[0].toLowerCase();
		const candidateEra = candidate.match(/\b(AH|Hijri|CE|AD|BCE|BC)\b/i)?.[0].toLowerCase();
		return era === candidateEra && (era ? /^\d{1,4}\s*(?:AH|Hijri|CE|AD|BCE|BC)$/i : /^(?:18|19|20|21)\d{2}$/).test(candidate);
	}
	if (category === "date") return /\b\d{1,2}\s+[A-Za-z]+\s+\d{4}\b|\b[A-Za-z]+\s+\d{1,2},?\s+\d{4}\b|\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/i.test(candidate);
	if (category === "count") {
		const numberPattern = /^(?:∞|-?\d+(?:[.,]\d+)?\+?(?:\s*(?:years?|months?|days?|times?|hours?|seats?|members?|km|kilomet(?:er|re)s?|%|°c?))?)$/i;
		const formulaPattern = /^n\s*\+\s*\d+\s+faces?$/i;
		const unitOf = (value: string) => value === "∞" ? "" : value.match(/^-?\d+(?:[.,]\d+)?\+?\s*(.*)$/)?.[1].trim().toLowerCase() ?? value.match(/^n\s*\+\s*\d+\s+(.*)$/i)?.[1].trim().toLowerCase();
		return (numberPattern.test(candidate) || formulaPattern.test(candidate)) && unitOf(correct) === unitOf(candidate);
	}
	if (category === "fraction") return /^\d+\/\d+$/.test(candidate);
	if (category === "ordinal") return /^\d+(?:st|nd|rd|th)$/i.test(candidate);
	if (category === "letter") return /^[A-Z]$/i.test(candidate);
	if (category === "numeric-list") return candidate.split(/\s*,\s*/).length === correct.split(/\s*,\s*/).length && candidate.split(/\s*,\s*/).every((value) => /^\d+(?:\.\d+)?$/.test(value));
	if (category === "country" || category === "person") return !/[;()]|\b(?:and|or)\b/i.test(candidate) && !/\d/.test(candidate);
	if (category === "country-list" || category === "person-list") return /,|\band\b|\bor\b/i.test(candidate);
	return candidate.length > 0;
};

const numericDistractors = (category: "year" | "count", correct: string): string[] => {
	if (category === "count" && correct === "∞") return ["1", "2", "3", "4"];
	const match = correct.match(/^(-?\d+(?:[.,]\d+)?)(.*)$/);
	if (!match) return [];
	const value = Number(match[1].replace(",", ""));
	const suffix = match[2];
	const offsets = category === "year" ? [-1, 1, -2, 2, -5, 5, -10, 10] : [1, -1, 2, -2, 3, -3, 5, -5, 10, -10];
	return offsets.map((offset) => `${value + offset}${suffix}`);
};

const grammarDistractors = ["in", "on", "at", "by", "for", "from", "with", "to", "of", "about", "under", "over", "across", "into", "among", "between", "during", "through", "against", "after", "before", "without", "within"];
const organizationDistractors = ["International Monetary Fund", "North Atlantic Treaty Organization", "World Health Organization", "United Nations Educational, Scientific and Cultural Organization"];
const cityDistractors = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi"];
const placeDistractors = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta", "New York", "London", "Brussels"];
const riverDistractors = ["Indus River", "Jhelum River", "Chenab River", "Ravi River", "Sutlej River", "Kabul River", "Subansiri River"];
const seaDistractors = ["Arabian Sea", "Mediterranean Sea", "Red Sea", "Black Sea", "Caspian Sea", "Baltic Sea", "South China Sea"];
const lakeDistractors = ["Lake Superior", "Lake Victoria", "Lake Huron", "Lake Michigan", "Lake Tanganyika"];
const islandDistractors = ["Honshu", "Hokkaido", "Kyushu", "Shikoku"];
const islandFallbacks = ["Greenland", "New Guinea", "Borneo", "Madagascar", "Baffin Island", "Honshu"];
const countryDistractors = ["Afghanistan", "Bangladesh", "China", "India", "Iran", "Pakistan", "Tajikistan", "United States"];
const languageDistractors = ["Punjabi", "Urdu", "Persian", "Arabic", "Pashto", "Sindhi", "English"];
const provinceDistractors = ["Khyber Pakhtunkhwa", "Punjab", "Sindh", "Balochistan"];
const sportDistractors = ["Tennis", "Badminton", "Squash", "Table tennis"];
const personListDistractors = ["Alain Aspect, John F. Clauser, and Anton Zeilinger", "John J. Hopfield and Geoffrey Hinton", "Katalin Karikó and Drew Weissman"];
const denominationDistractors = ["Rs. 1", "Rs. 5", "Rs. 10", "Rs. 100"];
const currencyDistractors = ["Pakistani rupee", "Indian rupee", "Chinese yuan", "US dollar", "British pound", "Euro", "Saudi riyal", "Japanese yen"];
const facilityDistractors = ["PAF Base Mushaf", "PAF Base Shahbaz", "PAF Base Masroor", "PAF Base Nur Khan", "PNS Jinnah"];
const cantonmentDistractors = ["Kharian Cantonment", "Lahore Cantonment", "Rawalpindi Cantonment", "Karachi Cantonment"];
const rankDistractors = ["Captain", "Major", "Colonel", "Brigadier", "Lieutenant Colonel", "General"];
const directionDistractors = ["North", "South", "East", "West"];
const ratioDistractors = ["1:2", "2:3", "3:4", "4:5", "1:3"];
const religionDistractors = ["Islam", "Hinduism", "Christianity", "Buddhism", "Sikhism", "Judaism"];
const personDistractors = ["Ali", "Ahmad", "John", "Ralph", "Frank", "Azhar", "Javed", "Aslam", "Yaqoob"];
const landmarkDistractors = ["Khyber Pass", "Quaid-e-Azam Residency", "Badshahi Mosque", "Islamia College, Peshawar", "Faisal Mosque"];
const mottoDistractors = ["Iman, Taqwa, Jihad-fi-Sabilillah", "Himmat ka Alam, Allah ka Karam, Mojon pe Qadam", "Second to None", "Faith, Unity, Discipline"];
const activityDistractors = ["Boating", "Fishing", "Water skiing", "Jet skiing"];
const awardDistractors = ["Nishan-e-Haider", "Hilal-e-Jurat", "Sitara-e-Jurat", "Nishan-e-Pakistan"];
const eventDistractors = ["Battle of Badr", "Battle of Uhud", "Battle of the Trench", "World War I", "World War II", "The 1857 uprising"];
const constitutionDistractors = ["The 1956 Constitution", "The 1962 Constitution", "The 1973 Constitution"];
const districtDistractors = ["Matiari", "Haripur", "Kohat", "Larkana", "Chagai"];
const regionDistractors = ["South Asia", "Central Asia", "West Asia", "Southeast Asia"];
const agreementDistractors = ["Simla Agreement", "Tashkent Agreement", "Lucknow Pact", "Treaty of Versailles"];
const legislationDistractors = ["Indian Independence Act 1947", "Government of India Act 1935", "Lahore Resolution", "Simla Agreement"];
const functionDistractors = ["Regulates electronic media and broadcasting", "Issues currency", "Manages monetary policy", "Conducts national elections"];
const fractionDistractors = (answer: string): string[] => {
	const denominator = answer.match(/^\d+\/(\d+)$/)?.[1];
	return denominator ? [1, 2, 3, 4, 5].filter((numerator) => `${numerator}/${denominator}` !== answer).map((numerator) => `${numerator}/${denominator}`) : [];
};
const bookDistractors = ["The Prince", "Dune", "The Story of the Malakand Field Force", "Daughter of the East"];
const ordinalDistractors = ["1st", "2nd", "3rd", "4th", "5th", "9th"];
const letterDistractors = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const transformationDistractors = ["He tells me not to worry.", "He told me not to worry.", "He says me don't worry.", "Let yourself be prepared for the worst."];
const reasonDistractors = ["To kill germs", "For learning and overall growth", "To provide irrigation water", "To generate electricity"];
const partyDistractors = ["Pakistan Peoples Party", "Pakistan Muslim League (N)", "Pakistan Tehreek-e-Insaf", "Awami National Party"];
const schoolDistractors = ["Lady Jennings Nursery School", "Aitchison College", "Karachi Grammar School", "Convent of Jesus and Mary"];
const weekdayDistractors = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const bodyDistractors = ["The Parliament", "The Supreme Court", "The President", "The Council of Common Interests"];
const roleDistractors = ["Prime Minister of Pakistan", "Law Minister of Pakistan", "Foreign Minister of Pakistan", "Governor-General of Pakistan"];
const aliasDistractors = ["Silk Route", "Karakoram Highway", "Ancient Silk Road", "Karakoram Route"];
const definitionDistractors = ["army", "soldier", "camp", "military force"];
const sequenceDistractors = ["65", "70", "75", "80", "85"];
const mirrorDistractors = ["TITITIT", "HIX", "TOOT", "MOM"];
const issueDistractors = ["Girls' education", "Women's rights", "Children's rights", "Access to schooling"];
const platformDistractors = ["Instagram", "Facebook", "TikTok", "X"];
const fieldDistractors = ["Trigonometry", "Geometry", "Algebra", "Calculus", "Arithmetic"];
const senseDistractors = ["Hearing", "Sight", "Smell", "Touch", "Taste"];
const antonymDistractors = (answer: string): string[] => {
	const alternatives: Record<string, string[]> = {
		modern: ["recent", "contemporary", "current", "old"],
		tame: ["domesticated", "calm", "gentle", "wild"],
		domesticated: ["tame", "gentle", "calm", "wild"],
		retain: ["keep", "preserve", "hold", "relinquish"],
		least: ["smallest", "lowest", "minor", "foremost"],
		small: ["little", "tiny", "narrow", "large"],
		large: ["big", "huge", "wide", "small"]
	};
	return alternatives[answer.toLowerCase()] ?? ["opposite", "similar", "related", "different"];
};
const synonymDistractors = (answer: string): string[] => {
	const alternatives: Record<string, string[]> = {
		synopsis: ["summary", "outline", "abstract", "overview"],
		big: ["large", "huge", "great", "substantial"],
		happy: ["glad", "cheerful", "pleased", "joyful"]
	};
	return alternatives[answer.toLowerCase()] ?? ["summary", "outline", "overview", "abstract"];
};
const mountainDistractors = ["Karakoram", "Himalayas", "Hindu Raj", "Pamir Mountains"];
const mineralDistractors = ["Quartz", "Corundum", "Topaz", "Diamond", "Gypsum"];
const countryPairDistractors = ["Hungary and Serbia", "Spain and Portugal", "Croatia and Slovenia", "Austria and Switzerland"];
const articleDistractors = ["a and an", "a and the", "an and the", "the, a, and an"];

const listedAnswers = (question: string): string[] => {
	const separator = question.indexOf(":");
	if (separator < 0) return [];
	const items = question.slice(separator + 1).split(/,|\band\b/i).map((item) => item.trim().replace(/[?.]+$/, ""));
	return items.length >= 3 && items.length <= 6 ? items : [];
};

const namedPeopleIn = (question: string): string[] => {
	const excluded = new Set(["Who", "Which", "What", "When", "Where", "Why", "How", "The", "A", "An", "After", "Before", "Between", "North", "South", "East", "West"]);
	return [...new Set(question.match(/\b[A-Z][a-z]{1,}\b/g) ?? [])].filter((name) => !excluded.has(name));
};

const spellingDistractors = (answer: string): string[] => {
	const letters = answer.replace(/[^a-z]/gi, "").split("");
	const variants = new Set<string>();
	for (let index = 0; index < letters.length - 1; index += 1) {
		const swapped = [...letters];
		[swapped[index], swapped[index + 1]] = [swapped[index + 1], swapped[index]];
		variants.add(swapped.join("-").toUpperCase());
	}
	return [...variants];
};

const numericListDistractors = (answer: string): string[] => {
	const values = answer.split(/\s*,\s*/);
	if (values.length < 3 || values.some((value) => !/^\d+(?:\.\d+)?$/.test(value))) return [];
	return values.map((value, index) => values.map((entry, entryIndex) => {
		if (entryIndex !== index) return entry;
		const number = Number(entry);
		return String(number + (index % 2 === 0 ? 1 : -1));
	}).join(", "));
};

const questionKeywords = (question: string): Set<string> => {
	const ignored = new Set(["what", "which", "where", "when", "who", "whom", "whose", "why", "how", "does", "did", "was", "were", "are", "is", "the", "a", "an", "in", "on", "at", "to", "of", "for", "from", "with", "by", "and", "or", "as", "it", "its", "this", "that", "these", "those", "be", "been", "being", "do", "has", "have", "had", "will", "would", "can", "could", "may", "might", "should", "after", "before", "during", "according", "pdf"]);
	return new Set((question.toLowerCase().match(/[a-z]{4,}/g) ?? []).filter((word) => !ignored.has(word)));
};

const sharesQuestionTopic = (question: string, candidateQuestion: string): boolean => {
	const keywords = questionKeywords(question);
	return [...questionKeywords(candidateQuestion)].some((word) => keywords.has(word));
};

export const toMCQs = (sourceRows: readonly MCQRow[], distractorRows: readonly MCQRow[] = sourceRows): MCQ[] =>
	sourceRows.map(([question, sourceAnswer, reason], index) => {
		const category = categoryFor(question, sourceAnswer);
		const correctAnswer = normalizeAnswer(category, sourceAnswer);
		const localCandidates = distractorRows
			.filter(([candidateQuestion, candidateAnswer]) => categoryFor(candidateQuestion, candidateAnswer) === category && (category !== "general" || sharesQuestionTopic(question, candidateQuestion)))
			.map(([, candidateAnswer]) => normalizeAnswer(category, candidateAnswer))
			.filter((candidate) => candidate.toLowerCase() !== correctAnswer.toLowerCase() && isCompatibleAnswer(category, correctAnswer, candidate));
		const relevantFallbacks = [
			...(category === "organization" ? organizationDistractors : []),
			...(category === "headquarters" ? placeDistractors : []),
			...(category === "country" ? countryDistractors : []),
			...(category === "city" ? cityDistractors : []),
			...(category === "place" ? placeDistractors : []),
			...(category === "river" ? riverDistractors : []),
			...(category === "sea" ? seaDistractors : []),
			...(category === "lake" ? lakeDistractors : []),
			...(category === "island" && /\bjapan\b/i.test(question) ? islandDistractors : []),
			...(category === "island" ? islandFallbacks : []),
			...(category === "province" ? provinceDistractors : []),
			...(category === "sport" ? sportDistractors : []),
			...(category === "facility" ? facilityDistractors : []),
			...(category === "cantonment" ? cantonmentDistractors : []),
			...(category === "rank" ? rankDistractors : []),
			...(category === "religion" ? religionDistractors : []),
			...(category === "person" ? personDistractors : []),
			...(category === "landmark" ? landmarkDistractors : []),
			...(category === "award" ? awardDistractors : []),
			...(category === "event" ? eventDistractors : []),
			...(category === "constitution" ? constitutionDistractors : []),
			...(category === "district" ? districtDistractors : []),
			...(category === "region" ? regionDistractors : []),
			...(category === "agreement" ? agreementDistractors : []),
			...(category === "legislation" ? legislationDistractors : []),
			...(category === "function" ? functionDistractors : []),
			...(category === "fraction" ? fractionDistractors(correctAnswer) : []),
			...(category === "book" ? bookDistractors : []),
			...(category === "weekday" ? weekdayDistractors : []),
			...(category === "body" ? bodyDistractors : []),
			...(category === "ordinal" ? ordinalDistractors : []),
			...(category === "letter" ? letterDistractors : []),
			...(category === "transformation" ? transformationDistractors : []),
			...(category === "reason" ? reasonDistractors : []),
			...(category === "party" ? partyDistractors : []),
			...(category === "school" ? schoolDistractors : []),
			...(category === "role" ? roleDistractors : []),
			...(category === "issue" ? issueDistractors : []),
			...(category === "platform" ? platformDistractors : []),
			...(category === "field" ? fieldDistractors : []),
			...(category === "sense" ? senseDistractors : []),
			...(category === "alias" ? aliasDistractors : []),
			...(category === "definition" ? definitionDistractors : []),
			...(category === "sequence" ? sequenceDistractors : []),
			...(category === "mirror" ? mirrorDistractors : []),
			...(category === "spelling" ? spellingDistractors(correctAnswer) : []),
			...(category === "antonym" ? antonymDistractors(correctAnswer) : []),
			...(category === "synonym" ? synonymDistractors(correctAnswer) : []),
			...(category === "numeric-list" ? numericListDistractors(correctAnswer) : []),
			...(category === "motto" ? mottoDistractors : []),
			...(category === "activity" ? activityDistractors : []),
			...(category === "direction" ? directionDistractors : []),
			...(category === "ratio" ? ratioDistractors : []),
			...(category === "person-list" ? personListDistractors : []),
			...(category === "denomination" ? denominationDistractors : []),
			...(category === "currency" ? currencyDistractors : []),
			...(category === "language" ? languageDistractors : []),
			...(category === "mountain" ? mountainDistractors : []),
			...(category === "mineral" ? mineralDistractors : []),
			...(category === "country-list" ? countryPairDistractors : []),
			...(category === "article" ? articleDistractors : []),
			...(category === "count" && /\bprism\b/i.test(question) ? ["n + 1 faces", "n + 3 faces", "n + 4 faces"] : [])
		];
		const contextualCandidates = category === "person" ? namedPeopleIn(question) : [];
		const candidates = [...new Set([...listedAnswers(question), ...contextualCandidates, ...localCandidates, ...relevantFallbacks])]
			.filter((candidate) => candidate.toLowerCase() !== correctAnswer.toLowerCase() && isCompatibleAnswer(category, correctAnswer, candidate));
		const options = [correctAnswer];

		for (let offset = 0; offset < candidates.length && options.length < 4; offset += 1) {
			const candidate = candidates[(index + offset) % candidates.length];
			if (!options.some((option) => option.toLowerCase() === candidate.toLowerCase())) options.push(candidate);
		}

		if ((category === "year" || category === "count") && options.length < 4) {
			for (const candidate of numericDistractors(category, correctAnswer)) {
				if (!options.some((option) => option.toLowerCase() === candidate.toLowerCase())) options.push(candidate);
				if (options.length === 4) break;
			}
		}

		if (category === "grammar" && options.length < 4) {
			for (const candidate of grammarDistractors) {
				if (!options.some((option) => option.toLowerCase() === candidate.toLowerCase())) options.push(candidate);
				if (options.length === 4) break;
			}
		}

		if (options.length !== 4) throw new Error(`Not enough relevant answer choices for: ${question}`);
		const answerPosition = index % 4;
		[options[0], options[answerPosition]] = [options[answerPosition], options[0]];

		return {
			question,
			options: options as MCQ["options"],
			correctAnswer,
			reason: reason ?? `The correct answer is ${correctAnswer}.`
		};
	});