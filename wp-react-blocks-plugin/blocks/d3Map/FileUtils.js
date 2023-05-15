const ***REMOVED*** = ({
                            fileType,
                            taxonomy
                        }) => {

    const ***REMOVED*** = taxonomy != 'none' && fileType != 'none' ? `&${taxonomy}=${fileType}` : ''
    const mapFiles = [{value: '', label: 'None'}]
    wp.apiFetch({
        path: '/wp/v2/media?mime_type=application/json' + ***REMOVED***,
    }).then(json => {
        if (json) {
            json.forEach(f => {
                mapFiles.push({value: f.id, label: f.title.rendered})
            })

            this.setState({mapFiles: mapFiles})
        }
    });
}

export default ***REMOVED***
