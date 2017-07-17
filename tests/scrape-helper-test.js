const { assert } = require('chai');  // Using Assert style
const { expect } = require('chai');  // Using Expect style

const cheerio = require('cheerio');

const ScrapeHelper = require('../app/helper/scrape-helper');

const formTestHtml = (innerHtml) => {
	return `<html>
	<head>
		<title>Scrape Helper Test</title>
	</head>
	<body>

	<div class="test-block">
		${innerHtml}
	</div>

	</body>
	</html>`;
};

const createTestHtmlElement = (innerHtml, selector) => {
	const html = formTestHtml(innerHtml);
	const $ = cheerio.load(html);
	return $('.test-block');
};

describe('Scrape Helper', function(){

	describe('Parses Numbers (::parseTypographyNumber())', function(){

		const scrapeHelper = new ScrapeHelper();

		it('Parses 0-9 accurately', function(){
			const typographyHtml = `
				<div class="typography typography-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
				<div class="typography typography-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
				<div class="typography typography-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
				<div class="typography typography-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
				<div class="typography typography-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
				<div class="typography typography-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M3.7 3.7v5.5h7.5l3.4 3.7v5.5L11.1 22H0v-3.7h9.3l1.8-1.8v-1.8l-1.8-1.8H1.8L0 11V0h14.5v3.7H3.7z"></path></svg></div>
        <div class="typography typography-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.6 22"><path fill="#231815" d="M14.6 12.8v5.5L11 22H3.7L0 18.3V3.7L3.7 0h9.2v3.7H5.5L3.7 5.5v3.7H11l3.6 3.6zM11 16.5v-1.9l-1.8-1.8H3.7v3.7l1.8 1.8h3.7l1.8-1.8z"></path></svg></div>
        <div class="typography typography-7"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.6 22"><path fill="#231815" d="M14.6 12.8v5.5L11 22H3.7L0 18.3V3.7L3.7 0h9.2v3.7H5.5L3.7 5.5v3.7H11l3.6 3.6zM11 16.5v-1.9l-1.8-1.8H3.7v3.7l1.8 1.8h3.7l1.8-1.8z"></path></svg></div>
        <div class="typography typography-8"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.6 22"><path fill="#231815" d="M14.6 12.8v5.5L11 22H3.7L0 18.3V3.7L3.7 0h9.2v3.7H5.5L3.7 5.5v3.7H11l3.6 3.6zM11 16.5v-1.9l-1.8-1.8H3.7v3.7l1.8 1.8h3.7l1.8-1.8z"></path></svg></div>
        <div class="typography typography-9"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.6 22"><path fill="#231815" d="M14.6 12.8v5.5L11 22H3.7L0 18.3V3.7L3.7 0h9.2v3.7H5.5L3.7 5.5v3.7H11l3.6 3.6zM11 16.5v-1.9l-1.8-1.8H3.7v3.7l1.8 1.8h3.7l1.8-1.8z"></path></svg></div>
      `;
			const testEl = createTestHtmlElement(typographyHtml);
			const result = scrapeHelper.parseTypographyNumber(testEl);

			assert.equal('0123456789', result);
		});

		it('Parses decimal (.)', function(){
        const typographyHtml = `<div class="typography typography-second"><svg xmlns="http://www.w3.org/2000/svg" viewBox="293.3 0 213.3 1280"><path fill="#A58C26" d="M293.3 1066.7h213.3V1280H293.3v-213.3z"></path></svg></div>`;

				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseTypographyNumber(testEl);

				assert.equal('.', result);
		});

		it('Parses slash (/)', function(){
        const typographyHtml = `<div class="typography typography-slash"><svg xmlns="http://www.w3.org/2000/svg" viewBox="293.3 0 213.3 1280"><path fill="#A58C26" d="M293.3 1066.7h213.3V1280H293.3v-213.3z"></path></svg></div>`;

				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseTypographyNumber(testEl);

				assert.equal('/', result);
		});

		it('Parses colon (:)', function(){
        const typographyHtml = `<div class="typography typography-minute"><svg xmlns="http://www.w3.org/2000/svg" viewBox="293.3 0 213.3 1280"><path fill="#A58C26" d="M293.3 1066.7h213.3V1280H293.3v-213.3z"></path></svg></div>`;

				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseTypographyNumber(testEl);

				assert.equal(':', result);
		});

		it('Parses percent (%)', function(){
        const typographyHtml = `<div class="typography typography-percent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="293.3 0 213.3 1280"><path fill="#A58C26" d="M293.3 1066.7h213.3V1280H293.3v-213.3z"></path></svg></div>`;

				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseTypographyNumber(testEl);

				assert.equal('%', result);
		});

		it('Parses clear rate example: 6.45%', function(){
			const typographyHtml = `
        <div class="clear-flag"></div>
        <div class="typography typography-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.6 22"><path fill="#231815" d="M14.6 12.8v5.5L11 22H3.7L0 18.3V3.7L3.7 0h9.2v3.7H5.5L3.7 5.5v3.7H11l3.6 3.6zM11 16.5v-1.9l-1.8-1.8H3.7v3.7l1.8 1.8h3.7l1.8-1.8z"></path></svg></div>
        <div class="typography typography-second"><svg xmlns="http://www.w3.org/2000/svg" viewBox="293.3 0 213.3 1280"><path fill="#A58C26" d="M293.3 1066.7h213.3V1280H293.3v-213.3z"></path></svg></div>
        <div class="typography typography-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M14.5 18.3h-1.7V22H9.2v-3.7H0V9.2L9.2 0h3.7v14.7h1.7v3.6zm-5.3-3.6V5.5L3.7 11v3.7h5.5z"></path></svg></div>
        <div class="typography typography-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.5 22"><path fill="#231815" d="M3.7 3.7v5.5h7.5l3.4 3.7v5.5L11.1 22H0v-3.7h9.3l1.8-1.8v-1.8l-1.8-1.8H1.8L0 11V0h14.5v3.7H3.7z"></path></svg></div>
        <div class="typography typography-percent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 45"><path fill="#A58C26" d="M41.2.1v7.5L3.7 45H0v-7.5L37.4.1h3.8zM3.7 18.8L0 15.1V3.8L3.7.1h11.2l3.8 3.7v11.3l-3.8 3.7H3.7zm2.2-6h6.8V6H5.9v6.8zm31.5 13.5l3.8 3.8v11.2L37.4 45H26.2l-3.8-3.7V30.1l3.8-3.8h11.2zm-2.2 5.9h-6.8V39h6.8v-6.8z"></path></svg></div>
      `;
			const testEl = createTestHtmlElement(typographyHtml);
			const result = scrapeHelper.parseTypographyNumber(testEl);

			assert.equal('6.45%', result);
		});


	});

	describe('Parses Gameskin (::parseGameskin())', function(){

		const scrapeHelper = new ScrapeHelper();


	    // {gameskin: 'SMB1', selector: '.common_gs_sb'},
	    // {gameskin: 'SMB3', selector: '.common_gs_sb3'},
	    // {gameskin: 'SMW', selector: '.common_gs_sw'},
	    // {gameskin: 'NSMB', selector: '.common_gs_sbu'}
			// throw error

			it("Parses 'SMB1'", function(){
				const typographyHtml = `<div class="gameskin bg-image common_gs_sb"></div>`;
				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseGameskin(testEl);

				assert.equal('SMB1', result);
			});

			it("Parses 'SMB3'", function(){
				const typographyHtml = `<div class="gameskin bg-image common_gs_sb3"></div>`;
				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseGameskin(testEl);

				assert.equal('SMB3', result);
			});

			it("Parses 'SMW'", function(){
				const typographyHtml = `<div class="gameskin bg-image common_gs_sw"></div>`;
				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseGameskin(testEl);

				assert.equal('SMW', result);
			});

			it("Parses 'NSMB'", function(){
				const typographyHtml = `<div class="gameskin bg-image common_gs_sbu"></div>`;
				const testEl = createTestHtmlElement(typographyHtml);
				const result = scrapeHelper.parseGameskin(testEl);

				assert.equal('NSMB', result);
			});

			it("Throws error on missing or unknown gameskin", function(){
				const typographyHtml = `<div class="gameskin bg-image"></div>`;
				const testEl = createTestHtmlElement(typographyHtml);

				assert.throws(() => { scrapeHelper.parseGameskin(testEl); });
			});


	});


});
