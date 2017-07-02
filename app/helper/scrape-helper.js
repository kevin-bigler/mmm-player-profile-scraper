class ScrapeHelper {
	constructor() {

	}

  parseTypographyNumber(els) {
    // TODO create a test for this function (can use the below HTML)
    if (! els ) {
    	throw new TypeError("Element(s) parameter must be a valid object");
    }

    const element = els.first();
    /*
      Example (6.45%)

      <div class="clear-rate">
        <div class="clear-flag"></div>
        <div class="typography typography-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.6 22"><path fill="#231815" d="M14.6 12.8v5.5L11 22H3.7L0 18.3V3.7L3.7 0h9.2v3.7H5.5L3.7 5.5v3.7H11l3.6 3.6zM11 16.5v-1.9l-1.8-1.8H3.7v3.7l1.8 1.8h3.7l1.8-1.8z"></path></svg></div>
        <div class="typography typography-second"><svg xmlns="http://www.w3.org/2000/svg" viewBox="293.3 0 213.3 1280"><path fill="#A58C26" d="M293.3 1066.7h213.3V1280H293.3v-213.3z"></path></svg></div>
        <div class="typography typography-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
        <div class="typography typography-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M3.7 3.7v5.5h7.5l3.4 3.7v5.5L11.1 22H0v-3.7h9.3l1.8-1.8v-1.8l-1.8-1.8H1.8L0 11V0h14.5v3.7H3.7z"></path></svg></div>
        <div class="typography typography-percent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 45"><path fill="#A58C26" d="M41.2.1v7.5L3.7 45H0v-7.5L37.4.1h3.8zM3.7 18.8L0 15.1V3.8L3.7.1h11.2l3.8 3.7v11.3l-3.8 3.7H3.7zm2.2-6h6.8V6H5.9v6.8zm31.5 13.5l3.8 3.8v11.2L37.4 45H26.2l-3.8-3.7V30.1l3.8-3.8h11.2zm-2.2 5.9h-6.8V39h6.8v-6.8z"></path></svg></div>
      </div>
    */

    const typographyTokenMap = new Map();
    typographyTokenMap.set("second", ".");
    typographyTokenMap.set("slash", "/");
    typographyTokenMap.set("minute", ":");

    let resultTokens = [];
    let typographyElements = element.find(".typography");
		let classes, token;
		typographyElements.each((i, el) => {
			console.log('typeof i', typeof i);
			classes = this.getClasses(el);
			for (let cls of classes) {
				if (cls.includes('-')) {
					token = this.substringAfter(cls, '-');
					if (Number.isInteger(+token)) {
						resultTokens.push(token);
					} else {
						resultTokens.push(typographyTokenMap.get(token));
					}
				}
			}
		});

    const resultString = resultTokens.join('');

    return resultString;
  }

  parseGameskin(element){
    // -- mode (SMB1, SMB2, SMW, NSMB)
    const gameskinInfos = [
	    {gameskin: 'SMB1', selector: '.course-meta-info .common_gs_sb'},
	    {gameskin: 'SMB3', selector: '.course-meta-info .common_gs_sb3'},
	    {gameskin: 'SMW', selector: '.course-meta-info .common_gs_sw'},
	    {gameskin: 'NSMB', selector: '.course-meta-info .common_gs_sbu'}
		];

		for (let info of gameskinInfos) {
			if (element.find(info.selector).length > 0) {
				return info.gameskin;
			}
		}

		throw new Error('Gameskin could not be determined');
  }

	substringAfter(haystack, needle){
		let startPos = haystack.indexOf(needle) + needle.length;
		return haystack.substring(startPos);
	}

	getClasses(el){

		let classesString = '';
		if (el.attribs.class) {
			classesString = el.attribs.class;
		}
		let classes = classesString.split(' ');

		console.log('classes: ', classes);
		return classes;
	}

}

module.exports = ScrapeHelper;