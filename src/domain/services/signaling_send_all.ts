import { renderStateChange } from "../../infra/container_notifications_renderer";
import { Container } from "../aggregates/container";
import { DomainEvent, DomainEventPublisher } from "../core/event";
import { InMemoryDomainRepository } from "../core/repository";
import { DomainService } from "../core/service";
import { ContainerEventStateChanged } from "../events/container_events";
import { ContainerNotificationEvent } from "../events/notification_events";

/**
 * Signaling strategy that just sends all events instantly
 */
export class SignalingSendAll extends DomainService {
    constructor(
        private containerRepo: InMemoryDomainRepository<Container>,
        publisher: DomainEventPublisher
    ) {
        super(publisher);
    }

    handleEvent(event: ContainerEventStateChanged): void {
        this.emitEvent(
            new ContainerNotificationEvent(
                renderStateChange(this.containerRepo.get(event.containerId))
            )
        );
    }
}
