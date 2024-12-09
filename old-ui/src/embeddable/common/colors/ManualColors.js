import Colors from "./Colors";

class CustomColors extends Colors {

    constructor(app, type, colorBy, scheme, data, ***REMOVED***, ***REMOVED***, keys, indexBy, manualColors, locale, overallLabel, customLabels) {
        //colorBy, scheme, data, keys, indexBy
        super(colorBy, scheme, data, keys, indexBy)

        this._manualColor = {}

        this._manualColor[overallLabel] = manualColors ? manualColors['Overall'] : null

        //1 dimension by id == by measure        
        if (app != 'csv') {
            const ***REMOVED*** = (***REMOVED***) => {
                
                const ***REMOVED*** = [...***REMOVED***][***REMOVED***]

                if (***REMOVED***) {
                    items = ***REMOVED***.items
                }

                if (manualColors != null && manualColors != undefined) {
                    Object.keys(manualColors).forEach(k => {
                        const vals = items.filter(i => i.code === k);
                        if (vals.length > 0 && vals[0].labels) {
                            let translated;
                            if (locale) {
                                translated = vals[0].labels[locale.toUpperCase()]
                            }
                            if (translated) {
                                this._manualColor[translated] = manualColors[k]
                            } else {
                                this._manualColor[vals[0].value] = manualColors[k]
                            }
                        }
                    })
                }
            }

            const mapByMeasure = () => {
                items = ***REMOVED***
                Object.keys(manualColors).forEach(k => {
                    const vals = [...items].filter(i => i.value === k);
                    if (vals.length > 0 && vals[0].labels) {
                        const customLabel = customLabels[k]
                        if (customLabels && customLabel) {
                            this._manualColor[customLabel] = manualColors[k]
                        }

                        let translated;
                        if (locale) {
                            translated = vals[0].labels[locale.toUpperCase()]
                        }
                        if (translated) {
                            this._manualColor[translated] = manualColors[k]
                        } else {
                            this._manualColor[vals[0].label] = manualColors[k]
                        }
                    }
                })
            }

            const mapByKeys = () => {
                Object.keys(manualColors).forEach(k => {
                    this._manualColor[k] = manualColors[k]
                })
            }

            let items = []
            const ***REMOVED*** = type == 'line' ? 1 : colorBy === "index" ? 0 : 1

            if (!***REMOVED*** && !***REMOVED***) {
                mapByKeys()
            } else if (!***REMOVED***) {
                mapByMeasure()
            } else if (***REMOVED***.size == 1 && ***REMOVED*** == 1) {
                //single dimension color by measures
                if (indexBy == "measure") {
                    ***REMOVED***(0)
                } else {
                    mapByMeasure()
                }
            } else {
                ***REMOVED***(***REMOVED***)
            }
        } else {
            this._manualColor = manualColors
        }
    }

    getColor(id, datum) {

        if (this.colorBy === "index") {
            const color = this._manualColor[id] || this._manualColor[datum[this.indexBy]]
            return color ? color : "#5555"
        }
        if (this.colorBy === "id") {
            return this._manualColor[id] ? this._manualColor[id] : "#5555"
        }
        return "#5555";
    }

    ***REMOVED***(value) {

    }

    getColorByKey(value) {

        return this._manualColor[value] ? this._manualColor[value] : "#5555";
    }
}


export default CustomColors





