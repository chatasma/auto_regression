import React from "react";
import './CsvInput.css';
import CsvJson from "../../common/csv/CsvJson";

export default class CsvInput extends React.Component {
    constructor(props) {
        super(props);

        this.readFileInput = this.readFileInput.bind(this);

    }

    async readFileInput(files) {
        const parsedText = await files[0].text();
        let csvParser = new CsvJson(parsedText);
        const parsedJson = csvParser.toJSON();
    }

    render() {
        return (
            <div className="csv-input-area">
                <p>Input CSV File</p>
                <input onChange={e => {
                    this.readFileInput(e.target.files);
                }} accept=".csv" type="file" />
            </div>
        );
    }
    
}