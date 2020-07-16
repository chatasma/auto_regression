export default class CsvJson {
    constructor(csvSrc) {
        this.csvSrc = csvSrc;
    }

    toJSON() {
        const splittedCSV = this.csvSrc.split('\n');

        let headers = null;
        
        let parsedJson = [];
        for (let line of splittedCSV) {
            if (line.length === 0) continue;
            if (headers == null) {
                headers = line.split(',');
                continue;
            }
            
            const contents = line.split(',');

            // Ignore incompatible data
            if (contents.length !== headers.length) continue;

            let builderObject = {};

            let iteratorValue = 0;
            for (let dataValue of contents) {
                builderObject[headers[iteratorValue]] = dataValue;
                iteratorValue++;
            }

            parsedJson.push(builderObject);
        }

        return parsedJson;
    }
}