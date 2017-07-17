class ScrapeHelper {
	constructor() {

	}

  parseTypographyNumber(els) {
    if (! els ) {
    	throw new TypeError("Element(s) parameter must be a valid object");
    }

    const element = els.first();

    const typographyTokenMap = new Map();
    typographyTokenMap.set("second", ".");
    typographyTokenMap.set("slash", "/");
    typographyTokenMap.set("minute", ":");
    typographyTokenMap.set("percent", "%");

    let resultTokens = [];
    let typographyElements = element.find(".typography");
		let classes, token;
		typographyElements.each((i, el) => {
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
	    {gameskin: 'SMB1', selector: '.common_gs_sb'},
	    {gameskin: 'SMB3', selector: '.common_gs_sb3'},
	    {gameskin: 'SMW', selector: '.common_gs_sw'},
	    {gameskin: 'NSMB', selector: '.common_gs_sbu'}
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

		return classes;
	}

}

module.exports = ScrapeHelper;