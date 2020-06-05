exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').unsigned().notNullable();
  table.integer('document');
  table.text('fullname').unsigned().defaultTo('Anónimo');
  table.text('birthday');
  table.date('date');
  table.text('location');
  table.text('email').unsigned().notNullable();
  table.text('password').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('users');
