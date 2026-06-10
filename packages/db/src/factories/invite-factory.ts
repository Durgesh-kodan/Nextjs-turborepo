import { Invite } from "../types";
import { Factory } from "../utils/types";
import { createId } from "@paralleldrive/cuid2";
import { faker } from "@faker-js/faker";

export const createPopulatedInvite:Factory<Invite> = ({
    id = createId(),
    token = createId(),
    organizationId = createId(),
    expiresAt = faker.date.future(),
    createdAt = faker.date.past()
}={}) =>({
    id,
    token,
    organizationId,
    expiresAt,
    createdAt
})