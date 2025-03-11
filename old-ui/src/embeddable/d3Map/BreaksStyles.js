import * as d3 from "d3";


class BreaksStyles {

    constructor(props) {
        const {breaks, ***REMOVED***, ***REMOVED***, defaultSize} = props;
        this.breaks = breaks;
        this.***REMOVED*** = ***REMOVED***
        this.***REMOVED*** = ***REMOVED***
        this.defaultSize = defaultSize
        const lessThan = breaks.filter(b => b.type !== 'graterThan');
        const ***REMOVED*** = breaks.filter(b => b.type === 'graterThan');
        if (***REMOVED***.length > 0) {
            this.***REMOVED*** = ***REMOVED***[0];
        }

        this.domain = lessThan.map(d => Number(d.end))

        this.sizeScale = d3.***REMOVED***()
            .domain(this.domain)
            .range(lessThan.map(d => d.size));

        this.colorScale = d3.***REMOVED***()
            .domain(lessThan.map(d => d.end))
            .range(breaks.map(d => d.color));


        this.getSize = this.getSize.bind(this)
        this.getColor = this.getColor.bind(this)
    }


    getSize(value) {

        if (this.breaks.length > 0) {
            if (value > Math.max(...this.domain)) {
                return this.***REMOVED***.size
            }
            return this.defaultSize + this.sizeScale(value)
        }
        return this.defaultSize
    }


    getColor(value, isMarker) {

        if (this.breaks.length > 0) {
            if (value > Math.max(...this.domain)) {
                return this.***REMOVED***.color
            }
            return this.colorScale(value)

        }


        return this.***REMOVED***
    }

}

export default BreaksStyles