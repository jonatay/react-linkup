\set underscore `C:\util\unixUtil\cat underscore.js`
\set jpath `C:\util\unixUtil\cat jpath.js`
\set smooth `C:\util\unixUtil\cat smooth.js`

DROP SCHEMA plv8 CASCADE;

CREATE SCHEMA plv8
  AUTHORIZATION postgres;



--drop table plv8.plv8_modules;

create table plv8.plv8_modules(modname text primary key, load_on_start boolean, code text);

insert into plv8.plv8_modules values ('underscore',true,:'underscore'),
    ('jpath',true,:'jpath'),('smooth',true,:'smooth');

create or replace function plv8.plv8_startup()
returns void
language plv8
as
$$
load_module = function(modname)
{
    var rows = plv8.execute("SELECT code from plv8.plv8_modules " +
                            " where modname = $1", [modname]);
    for (var r = 0; r < rows.length; r++)
    {
        var code = rows[r].code;
        eval("(function() { " + code + "})")();
    }
        
};
// now load all the modules marked for loading on start
var rows = plv8.execute("SELECT modname, code from plv8.plv8_modules where load_on_start");
for (var r = 0; r < rows.length; r++)
{
 var code = rows[r].code;
 eval("(function() { " + code + "})")();
}
$$;