export const STATUS_CONFIG = {
    IN_PROCESS: { text: 'In Process', value: 1 },
    TO_VERIFY: { text: 'To Verify', value: 2 },
    COMPLETE: { text: 'Complete', value: 3 }
}

// key = 1 -> value = text
export const HASH_STATUS_CONFIG = {};
    for(let key in STATUS_CONFIG) {
        HASH_STATUS_CONFIG[STATUS_CONFIG[key].value] = STATUS_CONFIG[key].text
}

