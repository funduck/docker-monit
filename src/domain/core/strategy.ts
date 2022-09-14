import { Event } from "./events"
import { Exporter, Exporters } from "./exporter"
import { Notification } from "./notifications"

/**
 * Produces Notifications about Objects under monitoring`
 */
export abstract class Strategy {
    private enabled: boolean = true
    protected readonly exporter: Exporter
    readonly objectId: string

    /**
     * We provide ids of object and exporter because we dont want unnecessary coupling
     */
    constructor(objectId: string, exporterId: string) {
        this.objectId = objectId
        this.exporter = Exporters.getExporter(exporterId)
    }

    /**
     * Accept and store event about Object
     */
    abstract accept(event: Event): Promise<void>

    /**
     * Use this method to send notifications from strategy implemetation
     */
    protected send(notification: Notification): Promise<void> {
        if (this.isEnabled()) {
            return this.exporter.send(notification)
        }
        return new Promise(resolve => resolve())
    }

    /**
     * When Strategy is enabled, it sends notifications.
     * When not enabled it doesn't
     */
    isEnabled(): boolean {
        return this.enabled
    }

    enable() {
        this.enabled = true
    }

    disable() {
        this.enabled = false
    }
}
