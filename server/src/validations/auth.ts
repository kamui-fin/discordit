import { Joi, Segments } from "celebrate"

export const oauth = {
    [Segments.BODY]: Joi.object().keys({
        code: Joi.string().required(),
    }),
}
