/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
    pgm.createTable("users", {
        id: "id",
        email: {
            type: "varchar(40)",
            notNull: true,
        },
        password: {
            type: "varchar(255)",
            notNull: true,
        },
        createdAt: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        session: {
            type: "integer",
            default: null,
        },
    })
}

exports.down = pgm => {}
