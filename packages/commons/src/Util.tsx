export const togglePanel = <T extends Record<string, any> = Record<string, any>>(name: string, panelStatus: Record<string, boolean>, setAttributes: (attributes: T) => void) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelStatus: newStatus} as unknown as T)
}

export const panelFocus = <T extends Record<string, any> = Record<string, any>>(name: string, panelStatus: Record<string, boolean>, setAttributes: (attributes: T) => void) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelFocus: newStatus} as unknown as T)
}

export default {togglePanel, panelFocus}