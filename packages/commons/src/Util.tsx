export const togglePanel = (name: string, panelStatus: Record<string, boolean>, setAttributes: (attributes: Record<string, any>) => void) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelStatus: newStatus})
}

export const panelFocus = (name: string, panelStatus: Record<string, boolean>, setAttributes: (attributes: Record<string, any>) => void) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelFocus: newStatus})
}

export default {togglePanel}