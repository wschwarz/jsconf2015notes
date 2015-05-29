function pickOne(t) {
    return 0 === t.length ? null : t[Math.floor(Math.random() * t.length)]
}

function hex2rgb(t, e) {
    e || (e = 16);
    var a = [];
    return a.push(parseInt(t.substr(1, 1), 16) * e), a.push(parseInt(t.substr(2, 1), 16) * e), a.push(parseInt(t.substr(3, 1), 16) * e), a.join(",")
}

function Abm(t) {
    this.target = t.target, this.color = t.color, this.world = t.world, this.base = t.base, this.pos = new Vec3(t.x, t.y, t.z), this.velo = new Vec3, this.sensitivity = 16, this.ttl = 40 + 20 * Math.random(), this.speed = this.world.unit_speed * (.05 + .04 * Math.random()), this.dead = !1
}

function Base(t) {
    this.dead = !1, this.pos = new Vec3(t.x, t.y, t.z), this.capital = t.capital || !1, this.title = t.title || !1, this.color = t.color || "#fff", this.stock = {
        bombers: 0,
        fighters: 0,
        icbms: 0,
        abms: 0
    }, t.stock && (this.stock.bombers = t.stock.bombers || 0, this.stock.fighters = t.stock.fighters || 0, this.stock.icbms = t.stock.icbms || 0, this.stock.abms = t.stock.abms || 0), this.world = t.world, this.icbms_launched = 0, this.icbm_launch_max = t.icbm_launch_max || 0, this.icbm_launch_per_tick = t.icbm_launch_per_tick || 1, this.abms_launched = 0, this.abm_launch_max = t.abm_launch_max || 0, this.abm_launch_per_tick = t.abm_launch_per_tick || 1, this.bombers_launched = 0, this.bomber_launch_max = t.bomber_launch_max || 0, this.bomber_launch_per_tick = t.bomber_launch_per_tick || 1, this.fighters_launched = 0, this.fighter_launch_max = t.fighter_launch_max || 0, this.fighter_launch_per_tick = t.fighter_launch_per_tick || 1, this.danger_close = 400
}

function Boid(t) {
    this.world = t.world, this.boids = t.boids, this.speed = (10 + 5 * Math.random()) / 15, this.pos = new Vec3(this.world.max_x / 2, this.world.max_y / 2, 0), this.velo = new VecR(2 * Math.PI * Math.random(), this.speed).vec3(), this.color = "#fff", this.separation_range = 150, this.cohesion_range = 200, this.alignment_range = 500, this.separation_force = .7, this.cohesion_force = .1, this.alignment_force = .25, this.dead = !1
}

function Bomb(t) {
    return this.booms = t.booms, this.world = t.world, this.pos = new Vec3(t.x, t.y), this.target = t.target, this.target ? (this.speed = .05 + .05 * Math.random(), this.velo = this.target.pos.minus(this.pos).normalize().scale(5 * this.speed), this.gravity = new Vec3(0, .01), this.sensitivity = 64, void(this.dead = !1)) : void(this.dead = !0)
}

function Bomber(t) {
    this.ttl = t.ttl || 1e4, this.color = t.color, this.world = t.world, this.show_vectors = this.world.show_vectors, this.base = t.base, this.capital = t.capital, this.target = t.target || null, this.speed = this.world.unit_speed * (.3 + .5 * Math.random()), this.pos = new Vec3(t.x, t.y, 0), this.velo = new Vec3(Math.random() * this.speed, Math.random() * this.speed), this.max_z = Math.floor(.3 * this.world.max_z + .2 * this.world.max_z * Math.random()), this.attack_z = 10, this.vel_z = .5, this.separation_friend = .025 * this.world.max, this.separation_enemy = .2 * this.world.max, this.avoidance_enemy = .25 * this.world.max, this.hp = Math.floor(50 + 20 * Math.random()), this.hp_max = this.hp, this.laser = null, this.laser_range = .1 * this.world.max, this.laser_max = Math.floor(30 + 10 * Math.random()), this.laser_power = 0, this.laser_damage = 2, this.attack_range = .1 * this.world.max, this.killrange = 12, this.dead = !1
}

function Boom(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.fake3d = t.fake3d || !1, this.color = t.color || "255,255,255", this.world = t.world, this.style = t.style || !1, this.radius = t.radius || 100, this.initial_radius = this.radius, this.ttl = t.ttl || 60, this.initial_ttl = this.ttl, this.dead = !1, this.rate = .5 + .5 * Math.random()
}

function Capital(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.color = t.color || "#fff", this.title = t.title || !1, this.world = t.world, t.hasOwnProperty("strike") || (t.strike = !0), this.strike = t.strike, this.unit_rate = t.unit_rate || 0, this.units = t.units || 0, this.cities_max = t.cities_max || 0, this.factories_max = t.factories_max || 0, this.bases_max = t.bases_max || 0, this.bomber_launch_max = t.bomber_launch_max || 0, this.fighter_launch_max = t.fighter_launch_max || 0, this.icbm_launch_max = t.icbm_launch_max || 0, this.abm_launch_max = t.abm_launch_max || 0, this.sats_max = t.sats_max || 0, this.defcon = t.defcon || 1, this.danger_close = 450, this.stock = t.stock || {
        bombers: 0,
        fighters: 0,
        icbms: 0,
        abms: 0
    }, this.dead = !1, this.rot = 0, this.pos.x < this.world.max_x / 2 && (this.rot += Math.PI), this.pos.y < this.world.max_y / 2 && (this.rot += .25 * Math.PI), this.pos.y > this.world.max_y / 2 && (this.rot -= 1.75 * Math.PI), this.city_r = .2 * this.world.max, this.factory_r = .1 * this.world.max, this.base_r = .2 * this.world.max, this.myCities = [], this.addCities(), this.myFactories = [], this.addFactories(), this.myBases = [], this.addBases(), this.mySats = [], this.timer = 0, this.flash = !1, this.alert = 0
}

function City(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.color = t.color || "#fff", this.title = t.title || !1, this.world = t.world, this.capital = t.capital, this.units = 0, this.unit_rate = t.unit_rate || 0, this.pop = 5 + Math.floor(5 * Math.random()), this.dead = !1, this.distributions = !1, this.timer = 0, this.checkpoint = 90 + 20 * Math.random(), this.abms_launched = 0, this.abm_launch_max = t.abm_launch_max || 0, this.abm_launch_per_tick = t.abm_launch_per_tick || 1, this.stock = {
        abms: 0
    }, t.stock && (this.stock.abms = t.stock.abms || 0)
}

function Decoy(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.world = t.world, this.capital = t.capital, this.hidden = t.hidden || !1, this.color = t.color || "#fff", this.dead = !1, console.log(this.color), this.bombers = t.bombers || 0, this.fighters = t.fighters || 0, this.icbms = t.icbms || 0, this.abms = t.abms || 0, this.bombers_launched = 0, this.fighters_launched = 0, this.icbms_launched = 0, this.abms_launched = 0
}

function Factory(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.world = t.world, this.capital = t.capital || !1, this.color = t.color || "#fff", this.title = t.title || !1, this.units = t.units || 0, this.dead = !1, this.distributions = !1, this.timer = 0, this.checkpoint = 230 + 40 * Math.random(), this.amount = {
        bombers: 0,
        fighters: 0,
        icbms: 0,
        abms: 0
    }, this.abms_launched = 0, this.abm_launch_max = t.abm_launch_max || 0, this.abm_launch_per_tick = t.abm_launch_per_tick || 1, this.stock = {
        abms: 0
    }, t.stock && (this.stock.abms = t.stock.abms || 0)
}

function Fighter(t) {
    this.dead = !1, this.color = t.color, this.ttl = t.ttl || 1e4, this.world = t.world, this.base = t.base, this.capital = t.capital, this.show_vectors = this.world.show_vectors, this.speed = 1.5 + .5 * Math.random(), this.speed = this.world.unit_speed * (.7 + .5 * Math.random()), this.pos = new Vec3(t.x, t.y, 0), this.velo = new Vec3(Math.random() * this.speed, Math.random() * this.speed), this.max_z = Math.floor(.3 * this.world.max_z + .1 * this.world.max_z * Math.random()), this.vel_z = 1, this.attack_range = .4 * this.world.max, this.separation_friend = .2 * this.world.max, this.separation_enemy = .1 * this.world.max, this.hp = Math.floor(10 + 10 * Math.random()), this.laser = null, this.laser_range = .085 * this.world.max, this.laser_max = Math.floor(10 + 5 * Math.random()), this.laser_power = 0, this.mode = "station", this.station = (new Vec3).copy(this.base.pos), this.station.x = this.world.max_x / 2, this.station.z = this.max_z, this.base.pos.x < this.world.max_x / 2 ? this.station.x -= this.world.max_x / 2 * .1 : this.station.x += this.world.max_x / 2 * .1
}

function Icbm(t) {
    this.target = t.target, this.color = t.color, this.world = t.world, this.base = t.base, this.capital = t.capital, this.pos = new Vec3(t.x, t.y, t.z), this.distance = this.pos.range(this.target.pos), this.velo = new Vec3, this.killrange = 8, this.ttl = 1500, this.speed = this.world.unit_speed * (.005 + .005 * Math.random()), this.direction = this.base.pos.x > this.world.max_x / 2 ? -1 : 1, this.phase = 0, this.phasec = 0, this.trail = [], this.tickCount = 0, this.dead = !1
}

function Interceptor(t) {
    this.target = t.target, this.silo = t.silo, this.bombs = t.bombs, this.booms = t.booms, this.pos = new Vec3(t.x, t.y), this.velo = new Vec3, this.sensitivity = 48, this.ttl = 100, this.gravity = new Vec3(0, .1), this.speed = .2 + .1 * Math.random(), this.dead = !1
}

function Sat(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.color = t.color, this.city = t.city, this.world = t.world, this.capital = t.capital, this.phase_x = Math.PI * Math.random(), this.phase_y = Math.PI * Math.random(), this.speed_x = .0025 * Math.PI + .0025 * Math.PI * Math.random(), this.speed_y = .0025 * Math.PI + .0025 * Math.PI * Math.random(), this.angle = Math.PI * Math.random(), this.rotation = .005 * Math.PI + .005 * Math.PI * Math.random(), this.laser = null, this.laser_range = .25 * this.world.max, this.laser_max = Math.floor(30 + 10 * Math.random()), this.laser_power = 0, this.dead = !1
}

function Scanlines(t) {
    this.offset = 0, this.row_h = 16
}

function Silo(t) {
    this.booms = t.booms, this.bombs = t.bombs, this.interceptors = t.interceptors, this.h = t.h || 1 / 0, this.pos = new Vec3(t.x, t.y), this.launch_max = t.launch_max || 1, this.launch_per_tick = t.launch_per_tick || 1, this.stock = t.stock || 1e3, this.color = t.color || "#fff", this.launched = 0, this.timer = 0, this.flash = !1, this.dead = !1
}

function Streamer(t) {
    return this.booms = t.booms, this.pos = new Vec3(t.x, t.y), this.target = t.target, this.target ? (this.speed = .05 + .05 * Math.random(), this.velo = this.target.pos.minus(this.pos).normalize().scale(5 * this.speed), this.gravity = new Vec3(0, .01), this.sensitivity = 64, void(this.dead = !1)) : void(this.dead = !0)
}

function Supply(t) {
    this.color = t.color, this.world = t.world, this.capital = t.capital, this.target = t.target, this.units = t.units || null, this.stock = t.stock || null, this.pos = new Vec3(t.x, t.y, 0), this.velo = new Vec3, this.speed = 1 * this.world.unit_speed, this.supply_range = 8, this.dead = !1
}

function TheEnd(t) {
    this.pos = new Vec3(t.x, t.y, t.z), this.max = t.max, this.color = t.color || "255,255,255", this.age = 0, this.colors = ["#fff", "#000", "#f0f", "#ff0"], this.ix = 0, this.iy = this.colors.length, this.dead = !1, this.rate = 3
}

function World(t) {
    t || (t = {}), this.max_x = t.max_x || 1600, this.max_y = t.max_y || 900, this.max_z = t.max_z || 200, this.max = Math.min(this.max_x, this.max_y), this.unit_speed = .0025 * this.max, t.speed_factor && (this.unit_speed *= t.speed_factor), this.show_vectors = t.show_vectors || !1, this.flash = 0
}
var Vec3 = function(t, e, a) {
    this.x = t || 0, this.y = e || 0, this.z = a || 0
};
Vec3.prototype = {
    add: function(t) {
        return this.x = this.x + t.x, this.y = this.y + t.y, this.z = this.z + t.z, this
    },
    sub: function(t) {
        return this.x = this.x - t.x, this.y = this.y - t.y, this.z = this.z - t.z, this
    },
    minus: function(t) {
        var e = this.x - t.x,
            a = this.y - t.y,
            s = this.z - t.z;
        return new Vec3(e, a, s)
    },
    minusXY: function(t) {
        var e = this.x - t.x,
            a = this.y - t.y;
        return new Vec3(e, a, 0)
    },
    range: function(t) {
        var e = Math.abs(this.x - t.x),
            a = Math.abs(this.y - t.y),
            s = Math.abs(this.z - t.z);
        return Math.sqrt(e * e + a * a + s * s)
    },
    range2: function(t) {
        var e = Math.abs(this.x - t.x),
            a = Math.abs(this.y - t.y),
            s = Math.abs(this.z - t.z);
        return e * e + a * a + s * s
    },
    rangeX: function(t) {
        var e = Math.abs(this.x - t.x);
        return e
    },
    rangeXY: function(t) {
        var e = Math.abs(this.x - t.x),
            a = Math.abs(this.y - t.y);
        return Math.sqrt(e * e + a * a)
    },
    angleXYto: function(t) {
        var e = Math.abs(this.x - t.x),
            a = Math.abs(this.y - t.y),
            s = Math.abs(this.z - t.z);
        return Math.sqrt(e * e + a * a + s * s)
    },
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    magSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    angleXY: function() {
        return Math.atan2(this.y, this.x)
    },
    angleXZ: function() {
        return Math.atan2(this.z, this.x)
    },
    normalize: function() {
        var t = this.mag();
        return 0 === t ? (this.x = 0, this.y = 0, this.z = 0, this) : (this.x /= t, this.y /= t, this.z /= t, this)
    },
    scale: function(t) {
        return this.x *= t, this.y *= t, this.z *= t, this
    },
    limit: function(t) {
        return this.mag() > t && (this.normalize(), this.scale(t)), this
    },
    div: function(t) {
        return this.x /= t, this.y /= t, this.z /= t, this
    },
    copy: function(t) {
        return this.x = t.x, this.y = t.y, this.z = t.z, this
    },
    lerp: function(t, e) {
        return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
    },
    zero: function() {
        return this.x = 0, this.y = 0, this.z = 0, this
    }
};
var VecR = function(t, e) {
    this.a = t || 0, this.r = e || 0
};
VecR.prototype = {
    vec3: function() {
        var t = this.r * Math.cos(this.a),
            e = this.r * Math.sin(this.a),
            a = 0;
        return new Vec3(t, e, a)
    }
};
var Scenes = {}, App = function() {
        var t = this;
        this.view = null;
        var e = {};
        e.jsconf = [
            ["title", "title"],
            ["loading", "loading"],
            ["evil-y", "evileye"],
            ["basics", "interception", {
                silos_max: 1,
                launch_max: 1,
                launch_per_tick: 1,
                bomb_max: 1,
                bombs_per_tick: 1
            }],
            ["balance-gameplay", "interception", {
                silos_max: 1,
                launch_max: 1,
                launch_per_tick: 1,
                bomb_max: 2,
                bombs_per_tick: 1
            }],
            ["tweak-settings", "interception", {
                silos_max: 3,
                launch_max: 150,
                launch_per_tick: 1,
                bomb_max: 1,
                bombs_per_tick: 1,
                stock: 500
            }],
            ["big-big", "interception", {
                launch_max: 600,
                launch_per_tick: 30,
                bomb_max: 175,
                bombs_per_tick: 10,
                stock: 1e5
            }],
            ["gameloop", "gameloop"],
            ["raf", "raf"],
            ["gameloop_methods", "gameloop_methods"],
            ["delta", "delta"],
            ["canvas", "canvas"],
            ["canvas-title", "subtitle", {
                subtitle: "<canvas />"
            }],
            ["crt", "crt"],
            ["vector-graphics", "vector_graphics"],
            ["primitives", "primitives"],
            ["transforms", "transforms"],
            ["render-test", "render_test"],
            ["reflection", "basic", {
                code: ["10 GAME LOOP", "20 REQUEST ANIMATION FRAME", "30 CANVAS"]
            }],
            ["predators", "predators"],
            ["missile-attack-title", "subtitle", {
                subtitle: "missile attack"
            }],
            ["missile-attack", "war", {
                defcon: 1,
                capital_count: 2,
                bases_max: 3,
                cities_max: 3,
                factories_max: 0,
                sats_max: 0,
                icbm_launch_max: 3,
                abm_launch_max: 5,
                stock: {
                    bombers: 0,
                    fighters: 0,
                    icbms: 50,
                    abms: 500
                }
            }],
            ["nation-state-capital", "attract", {
                mode: "capital"
            }],
            ["nation-state-city", "attract", {
                mode: "city"
            }],
            ["nation-state-factory", "attract", {
                mode: "factory"
            }],
            ["nation-state-base", "attract", {
                mode: "base"
            }],
            ["nation-bomber", "attract", {
                mode: "bomber"
            }],
            ["nation-fighter", "attract", {
                mode: "fighter"
            }],
            ["nation-icbm", "attract", {
                mode: "icbm"
            }],
            ["nation-abm", "attract", {
                mode: "abm"
            }],
            ["nation-sat", "attract", {
                mode: "sat"
            }],
            ["cold-war-intro", "subtitle", {
                subtitle: "cold war"
            }],
            ["cold-war", "war", {
                first_strike: !0,
                defcon: 5,
                capital_count: 2,
                unit_rate: 1,
                bases_max: 3,
                cities_max: 3,
                factories_max: 3,
                sats_max: 1,
                bomber_launch_max: 15,
                fighter_launch_max: 10,
                icbm_launch_max: 5,
                abm_launch_max: 25,
                stock: {
                    bombers: 0,
                    fighters: 0,
                    icbms: 0,
                    abms: 0
                }
            }],
            ["internals-intro", "subtitle", {
                subtitle: "internals"
            }],
            ["new_world", "code", {
                code: ["var world = new World({", "  max_x: 1024,", "  max_y: 1024,", "  max_z: 256", "});"]
            }],
            ["world_collections", "code", {
                code: ["var World = function(opts){", "", "  this.max_x = opts.max_x;", "  this.max_y = opts.max_y;", "  this.max_z = opts.max_z;", "", "  this.init();", "", "};"]
            }],
            ["world_init", "code", {
                code: ["World.prototype.init = function(){", "", "  this.capitals = [];", "  this.bases = [];", "  this.bombers = [];", "  this.booms = [];", "", "  this.addCapitals();", "", "};"]
            }],
            ["capitals", "code", {
                code: ["world.capitals.push(new Capital({", "  world: world,", "  color: '#0ff',", "  x: world.max_x * 0.8,", "  y: world.max_y * 0.5,", "  z: 0", "}));"]
            }],
            ["bases", "code", {
                code: ["Capital.prototype.init = function(){", "  for(var i=0, ii=this.max_bases; i<ii; i++){", "    this.world.bases.push(new Base({", "      world: this.world,", "      capital: this,", "      // .. and determine", "      // .. x y z location", "      // .. relative to capital", "    }));", "  }", "};"]
            }],
            ["mainloop", "code", {
                code: ["function tick(){", "  update();", "  paint();", "  window.requestAnimationFrame(tick);", "}", "", "tick();"]
            }],
            ["iterate", "code", {
                code: ["function update(delta){", "  var i, ii;", "", "  for(i=0, ii=world.capitals.length; i<ii; i++){", "    world.capitals[i].update(delta);", "  }", "", "  for(i=0, ii=world.bases.length; i<ii; i++){", "    world.bases[i].update(delta);", "  }", "  //...", "}"]
            }],
            ["base_update", "code", {
                code: ["Base.prototype.update = function(delta){", "  while(this.stock.bombers > 0){", "    this.world.bombers.push(new Bomber({", "      world: this.world,", "      capital: this.capital,", "      target: this.selectTarget(),", "      x: this.pos.x,", "      y: this.pos.y,", "      z: this.pos.z", "    }));", "    this.stock.bombers --;", "  }", "};"]
            }],
            ["make_bomber", "code", {
                code: ["function Bomber(opts){", "  this.world = opts.world;", "  this.capital = opts.capital;", "  this.target = opts.target;", "  this.dead = false;", "  this.pos = new Vec3(opts.x, opts.y, opts.z);", "}"]
            }],
            ["iterate_bombers", "code", {
                code: ["function update(delta){", "  //...", "  for(i=0, ii=world.bombers.length; i<ii; i++){", "    world.bombers[i].update(delta);", "    if(world.bombers[i].dead){", "      world.bombers.splice(i, 1);", "      i--;", "      ii--;", "    }", "  }", "}"]
            }],
            ["bomber_update", "code", {
                code: ["Bomber.prototype.update = function(delta){", "  // pseudocode:", "  if_target_gone_pick_new_target();", "  vector_to_target();", "  if_target_in_range_destroy();", "  avoid_close_friendlies();", "  avoid_close_enemies();", "  shoot_close_enemies();", "};"]
            }],
            ["vec3", "vec3"],
            ["detection", "detection"],
            ["paint_init", "code", {
                code: ['// <canvas id="map"></canvas>', "", "var map = {};", "", "function start(){", "  var el = document.getElementById('map');", "  map.ctx = el.getContext('2d');", "", "  // work out scaling...", "", "};"]
            }],
            ["paint_bombers", "code", {
                code: ["function paint(){", "", "  map.ctx.clearRect(map.w, map.h);", "  ctx.save();", "  ctx.scale(map.scale, map.scale);", "", "  for(var i=0, ii=world.bombers.length; i<ii; i++){", "    world.bombers[i].paint(map.ctx);", "  }", "", "  ctx.restore();", "", "}"]
            }],
            ["bomber_paint", "code", {
                code: ["Bomber.prototype.paint = function(ctx){", "  ctx.save();", "  ctx.translate(this.pos.x, this.pos.y);", "  ctx.rotate(this.velo.angleXY());", "", "  // ... draw shape", "", "  ctx.restore();", "};"]
            }],
            ["bomber_shape", "code", {
                code: ["  // draw shape", "  var z = 8;", "  ctx.lineWidth = 1;", "  ctx.beginPath();", "  ctx.moveTo(z, 0);", "  ctx.lineTo(-z, -z);", "  ctx.lineTo(-z/2, 0);", "  ctx.lineTo(-z, z);", "  ctx.lineTo(z, 0);", "  ctx.closePath();", "  ctx.fill();"]
            }],
            ["hot-war-intro", "subtitle", {
                subtitle: "hot war"
            }],
            ["hot-war", "war", {
                defcon: 5,
                capital_count: 2,
                unit_rate: 2,
                bases_max: 5,
                cities_max: 3,
                factories_max: 5,
                sats_max: 1,
                bomber_launch_max: 15,
                fighter_launch_max: 5,
                icbm_launch_max: 3,
                abm_launch_max: 2,
                stock: {
                    bombers: 0,
                    fighters: 0,
                    icbms: 0,
                    abms: 0
                }
            }],
            ["total-war-intro", "subtitle", {
                subtitle: "total war"
            }],
            ["total-war", "war", {
                defcon: 1,
                capital_count: 4,
                bases_max: 2,
                cities_max: 0,
                factories_max: 0,
                sats_max: 0,
                bomber_launch_max: 10,
                fighter_launch_max: 10,
                icbm_launch_max: 5,
                abm_launch_max: 25,
                stock: {
                    bombers: 10,
                    fighters: 25,
                    icbms: 15,
                    abms: 100
                }
            }],
            ["theend", "theend"]
        ], e.wdyk = [
            ["evil-y", "evileye"],
            ["basics", "interception", {
                silos_max: 1,
                launch_max: 1,
                launch_per_tick: 1,
                bomb_max: 1,
                bombs_per_tick: 1
            }],
            ["balance-gameplay", "interception", {
                silos_max: 1,
                launch_max: 1,
                launch_per_tick: 1,
                bomb_max: 2,
                bombs_per_tick: 1
            }],
            ["tweak-settings", "interception", {
                silos_max: 3,
                launch_max: 150,
                launch_per_tick: 1,
                bomb_max: 1,
                bombs_per_tick: 1,
                stock: 500
            }],
            ["big-big", "interception", {
                launch_max: 450,
                launch_per_tick: 20,
                bomb_max: 120,
                bombs_per_tick: 5,
                stock: 1e5
            }],
            ["gameloop", "gameloop"],
            ["raf", "raf"],
            ["gameloop_methods", "gameloop_methods"],
            ["delta", "delta"],
            ["canvas", "canvas"],
            ["canvas-title", "subtitle", {
                subtitle: "&lt;canvas /&gt;"
            }],
            ["crt", "crt"],
            ["vector-graphics", "vector_graphics"],
            ["primitives", "primitives"],
            ["render-test", "render_test"],
            ["theend", "theend_wdyk"]
        ], e.coldwar = [
            ["coldwar", "coldwar"]
        ], this.scenes = e.coldwar, this.scene = this.scenes[0][0];
        (function() {
            var e = window.location.pathname.substr(1);
            if (e)
                for (var a = 0, s = t.scenes.length; s > a; a++)
                    if (t.scenes[a][0] === e) {
                        t.scene = e;
                        break
                    }
        })();
        this.el = document.getElementById("app"), this.start = function() {
            "coldwar" !== t.scene && this.bindKeys(), this.render()
        }, this.render = function(t) {
            if (this.view && this.view.stop(), t && (this.scene = t), this.scene) {
                for (var e, a = {}, s = 0, i = this.scenes.length; i > s; s++)
                    if (this.scenes[s][0] === this.scene) {
                        e = this.scenes[s][1], a = this.scenes[s][2] || {};
                        break
                    }
                this.view = new Scenes[e](this.el, a), this.view.start()
            }
        }, this["goto"] = function(t) {
            document.title = t, window.history.pushState(null, "", "/" + t), this.render(t)
        }, this.goPrev = function() {
            var t = null,
                e = 0;
            for (t = this.scenes[0]; this.scenes[e][0] !== this.scene && e < this.scenes.length - 1;) t = this.scenes[e], e++;
            this["goto"](t[0])
        }, this.goNext = function() {
            var t = 0;
            if (!this.scene) return void this.render(this.scenes[0][0]);
            for (; this.scenes[t][0] !== this.scene && t < this.scenes.length - 1;) t++;
            t++, t === this.scenes.length && t--, this["goto"](this.scenes[t][0])
        }, this.bindKeys = function() {
            var t = this;
            window.addEventListener("keydown", t.onKey.bind(this))
        }, this.onKey = function(t) {
            switch (t.which) {
                case 27:
                    this["goto"](this.scenes[0][0]);
                    break;
                case 9:
                    t.preventDefault(), this.view.hasOwnProperty("toggleMeta") && this.view.toggleMeta();
                    break;
                case 86:
                    t.preventDefault(), this.view.hasOwnProperty("toggleVectors") && this.view.toggleVectors();
                    break;
                case 37:
                    this.goPrev();
                    break;
                case 39:
                    this.goNext();
                    break;
                case 32:
                    this.goNext();
                    break;
                case 13:
                    this.render()
            }
        }
    }, app = new App;
document.addEventListener("DOMContentLoaded", function(t) {
    app.start()
}), Abm.prototype.update = function(t) {
    this.ttl--, this.ttl < 0 && (this.base.abms_launched--, this.dead = !0, this.world.booms.push(new Boom({
        world: this.world,
        radius: 10,
        ttl: 30,
        style: "",
        x: this.pos.x,
        y: this.pos.y,
        z: this.pos.z,
        color: hex2rgb(this.color, 8)
    })));
    var e = this.target.pos.minus(this.pos).normalize().scale(this.speed);
    this.velo.add(e), this.pos.add(this.velo);
    var a = new Vec3(0 - 20 * this.speed + 40 * this.speed * Math.random(), 0 - 20 * this.speed + 40 * this.speed * Math.random(), 0 - 20 * this.speed + 60 * this.speed * Math.random());
    this.pos.add(a);
    var s = this.pos.range(this.target.pos);
    s < this.sensitivity && (this.dead = !0, this.base.abms_launched--, this.target.destroy())
}, Abm.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.fillStyle = this.color, t.ctx.beginPath(), t.ctx.arc(0, 0, 1, 0, 2 * Math.PI), t.ctx.fill(), t.ctx.restore()
}, Abm.prototype.elevation = function(t) {
    var e = t.yscale;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.rotate(-this.velo.angleXZ()), t.ctx.fillStyle = this.color, t.ctx.beginPath(), t.ctx.arc(0, 0, 1, 0, 2 * Math.PI), t.ctx.fill(), t.ctx.restore()
}, Base.prototype.update = function(t) {
    this.launchBombers(), this.launchFighters(), this.launchIcbms(), this.launchAbms()
}, Base.prototype.addStock = function(t) {
    this.stock.bombers += t.bombers || 0, this.stock.fighters += t.fighters || 0, this.stock.icbms += t.icbms || 0, this.stock.abms += t.abms || 0
}, Base.prototype.launchBombers = function() {
    if (!(this.capital.defcon > 3) || this.capital.strike) {
        var t, e, a, s, i = 0;
        if (this.capital && !(this.stock.bombers <= 0 || this.bombers_launched >= this.bomber_launch_max)) {
            if (t = [], 0 === t.length)
                for (a = 0, s = this.world.factories.length; s > a; a++) this.world.factories[a].capital !== this.capital && t.push(this.world.factories[a]);
            if (0 === t.length)
                for (a = 0, s = this.world.cities.length; s > a; a++) this.world.cities[a].capital !== this.capital && t.push(this.world.cities[a]);
            if (0 === t.length)
                for (a = 0, s = this.world.capitals.length; s > a; a++) this.world.capitals[a] !== this.capital && t.push(this.world.capitals[a]);
            if (0 === t.length)
                for (a = 0, s = this.world.bases.length; s > a; a++) this.world.bases[a].capital !== this.capital && t.push(this.world.bases[a]);
            if (0 !== t.length)
                for (; this.stock.bombers > 0 && this.bombers_launched < this.bomber_launch_max && i < this.bomber_launch_per_tick;) e = pickOne(t), this.world.bombers.push(new Bomber({
                    x: this.pos.x,
                    y: this.pos.y,
                    world: this.world,
                    base: this,
                    capital: this.capital,
                    target: e,
                    color: this.color
                })), i++, this.bombers_launched++, this.stock.bombers--
        }
    }
}, Base.prototype.launchFighters = function() {
    if (!(this.capital.defcon > 4)) {
        var t, e = 0;
        if (this.capital && !(this.stock.fighters <= 0 || this.fighter_launch_max < this.fighters_launched))
            for (t = []; this.stock.fighters > 0 && this.fighters_launched < this.fighter_launch_max && e < this.fighter_launch_per_tick;) this.world.fighters.push(new Fighter({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                base: this,
                capital: this.capital,
                color: this.color
            })), e++, this.fighters_launched++, this.stock.fighters--
    }
}, Base.prototype.launchIcbms = function() {
    if (!(this.capital.defcon > 3 || this.capital.defcon > 1 && Math.random() > .001)) {
        var t, e, a, s, i = 0;
        if (this.capital && !(this.stock.icbms <= 0 || this.icbms_launched > this.icbm_launch_max)) {
            if (t = [], 0 === t.length)
                for (a = 0, s = this.world.capitals.length; s > a; a++) this.world.capitals[a] !== this.capital && t.push(this.world.capitals[a]);
            for (a = 0, s = this.world.factories.length; s > a; a++) this.world.factories[a].capital === this.capital || this.world.factories[a].dead || t.push(this.world.factories[a]);
            for (a = 0, s = this.world.bases.length; s > a; a++) this.world.bases[a].capital === this.capital || this.world.bases[a].dead || t.push(this.world.bases[a]);
            for (a = 0, s = this.world.cities.length; s > a; a++) this.world.cities[a].capital === this.capital || this.world.cities[a].dead || t.push(this.world.cities[a]);
            if (0 !== t.length)
                for (; this.stock.icbms > 0 && this.icbms_launched < this.icbm_launch_max && i < this.icbm_launch_per_tick;) e = pickOne(t), this.world.icbms.push(new Icbm({
                    x: this.pos.x,
                    y: this.pos.y,
                    z: this.pos.z,
                    base: this,
                    world: this.world,
                    capital: this.capital,
                    target: e,
                    color: this.color
                })), i++, this.icbms_launched++, this.stock.icbms--
        }
    }
}, Base.prototype.launchAbms = function() {
    var t, e, a = 0;
    if (!(this.stock.abms <= 0 || this.abms_launched >= this.abm_launch_max)) {
        t = [];
        for (var s, i = .2 * this.world.max_x, x = 0, o = this.world.icbms.length; o > x; x++) s = this.world.icbms[x], s.dead || s.capital !== this.capital && Math.abs(s.pos.x - this.pos.x) < i && t.push(s);
        if (0 !== t.length)
            for (; this.stock.abms > 0 && this.abms_launched < this.abm_launch_max && a < this.abm_launch_per_tick;) e = pickOne(t), this.world.abms.push(new Abm({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                base: this,
                target: e,
                color: this.color
            })), a++, this.abms_launched++, this.stock.abms--
    }
}, Base.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.strokeStyle = this.color, t.ctx.lineWidth = 2, t.ctx.beginPath(), t.ctx.rect(-12, -12, 24, 24), t.ctx.fillStyle = "#000", t.ctx.fill(), t.ctx.stroke(), t.ctx.fillStyle = this.color, t.ctx.font = "9pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "right", this.stock.bombers > 0 && t.ctx.fillText(this.stock.bombers, -20, -7), this.stock.fighters > 0 && t.ctx.fillText(this.stock.fighters, -20, 7), t.ctx.textAlign = "left", this.stock.icbms > 0 && t.ctx.fillText(this.stock.icbms, 20, -7), this.stock.abms > 0 && t.ctx.fillText(this.stock.abms, 20, 7), this.title && (t.ctx.fillStyle = this.color, t.ctx.font = "10pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText(this.title, 0, 32)), t.ctx.restore()
}, Base.prototype.elevation = function(t) {
    var e = t.yscale;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e - 1), t.ctx.lineWidth = 2, t.ctx.strokeStyle = this.color, t.ctx.fillStyle = "#000", t.ctx.beginPath(), t.ctx.rect(-6, -12, 12, 12), t.ctx.stroke(), t.ctx.fill(), t.ctx.restore()
}, Boid.prototype.update = function(t) {
    var e = this.steer();
    e.normalize().scale(.05), this.velo = this.velo.minus(e).normalize().scale(this.speed), this.pos.add(this.velo), this.pos.x < 0 && (this.pos.x = this.world.max_x), this.pos.x > this.world.max_x && (this.pos.x = 0), this.pos.y < 0 && (this.pos.y = this.world.max_y), this.pos.y > this.world.max_y && (this.pos.y = 0)
}, Boid.prototype.steer = function() {
    var t, e, a, s, i, x = 0,
        o = new Vec3,
        l = new Vec3,
        c = new Vec3;
    for (t = 0, e = this.boids.length; e > t; t++) s = this.boids[t], s !== this && (a = this.pos.rangeXY(s.pos), 0 !== a && (a <= this.separation_range && (i = s.pos.minus(this.pos), i.normalize().scale(this.separation_range / a), c.add(i)), i = this.pos.minus(s.pos), i.normalize().scale(this.cohesion_range / a), l.add(i), a <= this.alignment_range && (i = this.pos.minus(s.pos), o.add(i), x++)));
    return 0 === x ? new Vec3 : (c.normalize().scale(this.separation_force), l.normalize().scale(this.cohesion_force), o.div(3), o = this.pos.minus(o), o.normalize().scale(this.alignment_force), vector = new Vec3, vector.add(c), vector.add(l), vector.add(o), vector.normalize(), vector)
}, Boid.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.velo.angleXY()), t.ctx.fillStyle = "#fff";
    var e = 8;
    t.ctx.lineWidth = 1, t.ctx.beginPath(), t.ctx.moveTo(e, 0), t.ctx.lineTo(-e, -e), t.ctx.lineTo(-e / 2, 0), t.ctx.lineTo(-e, e), t.ctx.lineTo(e, 0), t.ctx.closePath(), t.ctx.fill(), t.ctx.restore()
}, Bomb.prototype.update = function(t) {
    if (!this.target) return void(this.dead = !0);
    var e = this.target.pos.minus(this.pos).normalize().scale(this.speed);
    this.velo.add(e), this.pos.add(this.velo), this.velo.add(this.gravity);
    var a = this.pos.range(this.target.pos);
    a < this.sensitivity && (this.dead = !0, this.booms.push(new Boom({
        style: "",
        x: this.pos.x,
        y: this.pos.y,
        color: "255,255,255"
    })), this.target.dead || (this.target.dead = !0, this.world.flash = 2, this.booms.push(new Boom({
        style: "zoom",
        radius: 100,
        ttl: 120,
        x: this.target.pos.x,
        y: this.target.pos.y,
        color: "255,0,255"
    })))), this.pos.y > this.target.pos.y && (this.dead = !0, this.booms.push(new Boom({
        style: "",
        radius: 35,
        x: this.pos.x,
        y: this.pos.y,
        color: "127,127,127"
    })))
}, Bomb.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.velo.angleXY()), t.ctx.fillStyle = "#f0f", t.ctx.beginPath(), t.ctx.rect(-12, -2, 24, 4), t.ctx.fill(), t.ctx.restore()
}, Bomber.prototype.update = function(t) {
    this.ttl--, this.ttl < 0 && (this.base && this.base.bombers_launched--, this.dead = !0), this.laser = null, this.laser_power < this.laser_max && this.laser_power++, this.hp < this.hp_max && (this.hp = this.hp + .01 * t), this.hit = !1, (!this.target || this.target.dead) && this.selectTarget();
    var e = this.pos.rangeXY(this.target.pos);
    e > this.attack_range && this.pos.z < this.max_z && (this.pos.z += this.vel_z), e < this.attack_range && this.pos.z > this.attack_z && (this.pos.z -= this.vel_z);
    var a;
    this.target ? a = this.target.pos.minus(this.pos).normalize() : this.base && (a = this.base.pos.minus(this.pos).normalize());
    var s = this.separation(),
        i = this.avoid(),
        x = new Vec3;
    a && x.add(a.scale(.5)), x.add(s), x.add(i), x.scale(this.speed), this.velo.add(x), this.velo.limit(this.speed), this.pos.add(this.velo), this.destroyTarget()
}, Bomber.prototype.selectTarget = function() {
    var t, e, a;
    if (a = [], 0 === a.length)
        for (t = 0, e = this.world.factories.length; e > t; t++) this.world.factories[t].capital !== this.capital && a.push(this.world.factories[t]);
    if (0 === a.length)
        for (t = 0, e = this.world.cities.length; e > t; t++) this.world.cities[t].capital !== this.capital && a.push(this.world.cities[t]);
    if (0 === a.length)
        for (t = 0, e = this.world.bases.length; e > t; t++) this.world.bases[t].capital !== this.capital && a.push(this.world.bases[t]);
    if (0 === a.length)
        for (t = 0, e = this.world.capitals.length; e > t; t++) this.world.capitals[t] !== this.capital && a.push(this.world.capitals[t]);
    0 !== a.length && (this.target = pickOne(a))
}, Bomber.prototype.destroyTarget = function() {
    var t = this.pos.range(this.target.pos);
    t < this.killrange && (this.dead = !0, "function" == typeof this.target.destroy ? this.target.destroy() : this.target.dead = !0, this.base && this.base.bombers_launched--, this.target.capital && this.target.capital.assetDestroyed(), this.world.flash = 2, this.world.booms.push(new Boom({
        world: this.world,
        style: "zoom",
        radius: 35,
        x: this.target.pos.x,
        y: this.target.pos.y,
        color: hex2rgb("#f0f")
    })))
}, Bomber.prototype.separation = function() {
    var t, e, a, s, i, x = new Vec3,
        o = 0;
    for (t = 0, e = this.world.bombers.length; e > t; t++)
        if (i = this.world.bombers[t], i !== this && (s = this.pos.rangeX(i.pos), !(s > this.avoidance_enemy) && (a = this.pos.rangeXY(i.pos), 0 !== a))) {
            if (i.capital === this.capital) {
                if (a > this.separation_friend) continue;
                x.add(this.pos.minusXY(i.pos).normalize().scale(this.separation_friend / a).scale(.25))
            } else {
                if (a > this.separation_enemy) continue;
                x.add(this.pos.minusXY(i.pos).normalize().scale(this.separation_enemy / a).scale(.25))
            }
            o++
        }
    return 0 === o ? new Vec3 : x.div(o)
}, Bomber.prototype.avoid = function() {
    var t, e, a, s, i, x = 1 / 0,
        o = 0,
        l = this.laser_range + 1,
        c = new Vec3;
    for (t = 0, e = this.world.fighters.length; e > t; t++) s = this.world.fighters[t], s.capital !== this.capital && (i = this.pos.range(s.pos), i < this.laser_range && (l = i, a = s), i > this.avoidance_distance || (x > i && (x = i), c.add(this.pos.minusXY(s.pos).normalize().scale(this.avoidance_enemy / i).scale(.25)), o++));
    return a && this.shoot(a), 0 === o ? new Vec3 : c.div(o)
}, Bomber.prototype.shoot = function(t) {
    this.laser_power <= 0 || (this.laser_power -= 1, this.laser = (new Vec3).copy(t.pos), t.damage(this.laser_damage))
}, Bomber.prototype.damage = function(t) {
    t || (t = 1), this.hp -= t, this.hit = !0, this.hp > 0 || this.dead || (this.base && this.base.bombers_launched--, this.dead = !0, this.world.booms.push(new Boom({
        world: this.world,
        radius: 20,
        ttl: 35,
        style: "",
        x: this.pos.x,
        y: this.pos.y,
        z: this.pos.z,
        color: hex2rgb(this.color)
    })))
}, Bomber.prototype.paint = function(t) {
    this.world.show_vectors && (t.ctx.beginPath(), t.ctx.strokeStyle = "rgba(255,255,255,0.25)", t.ctx.moveTo(this.pos.x, this.pos.y), t.ctx.lineTo(this.target.pos.x, this.target.pos.y), t.ctx.stroke()), this.laser && (t.ctx.beginPath(), t.ctx.lineWidth = 2, t.ctx.strokeStyle = "#f00", t.ctx.moveTo(this.pos.x, this.pos.y), t.ctx.lineTo(this.laser.x, this.laser.y), t.ctx.stroke()), t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.velo.angleXY()), this.hit ? (t.ctx.fillStyle = "#f00", t.ctx.strokeStyle = "#f00") : (t.ctx.fillStyle = this.color, t.ctx.strokeStyle = this.color);
    var e = 8;
    t.ctx.lineWidth = 1, t.ctx.beginPath(), t.ctx.moveTo(e, 0), t.ctx.lineTo(-e, -e), t.ctx.lineTo(-e / 2, 0), t.ctx.lineTo(-e, e), t.ctx.lineTo(e, 0), t.ctx.closePath(), t.ctx.fill(), t.ctx.restore()
}, Bomber.prototype.elevation = function(t) {
    var e = t.yscale;
    this.world.show_vectors && (t.ctx.beginPath(), t.ctx.strokeStyle = "rgba(255,255,255,0.25)", t.ctx.moveTo(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.lineTo(this.target.pos.x, (this.world.max_z - this.target.pos.z) * e), t.ctx.stroke()), t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.fillStyle = this.color, t.ctx.beginPath(), t.ctx.fillRect(-2, -2, 4, 4),
    t.ctx.restore(), this.laser && (t.ctx.beginPath(), t.ctx.lineWidth = 1, t.ctx.strokeStyle = "#f00", t.ctx.moveTo(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.lineTo(this.laser.x, (this.world.max_z - this.laser.z) * e), t.ctx.stroke())
}, Boom.prototype.update = function(t) {
    this.ttl -= this.rate * t, this.ttl <= 0 && (this.dead = !0)
}, Boom.prototype.paint = function(t) {
    t.ctx.save(), this.fake3d ? t.ctx.translate(this.pos.x, this.pos.y - this.pos.z) : t.ctx.translate(this.pos.x, this.pos.y);
    var e = this.radius * (this.ttl / this.initial_ttl),
        a = this.ttl / this.initial_ttl;
    switch (this.style) {
        case "splat":
            t.ctx.strokeStyle = "rgba(" + this.color + ", " + a.toFixed(2) + ")", t.ctx.beginPath(), t.ctx.arc(0, 0, e, 0, 2 * Math.PI), t.ctx.stroke();
            break;
        case "zoom":
            for (var s = 0; 10 > s; s++) t.ctx.strokeStyle = "rgba(" + this.color + ", " + (1 - (s / 10).toFixed(2)) + ")", t.ctx.beginPath(), t.ctx.lineWidth = 8 * (s / 10), t.ctx.arc(0, 0, (this.radius - e) * s / 10, 0, 2 * Math.PI), t.ctx.stroke();
            break;
        case "expand":
            e = this.initial_radius - this.radius * (this.ttl / this.initial_ttl), t.ctx.fillStyle = "rgba(" + this.color + ", " + a.toFixed(2) + ")", t.ctx.beginPath(), t.ctx.arc(0, 0, e, 0, 2 * Math.PI), t.ctx.fill();
            break;
        default:
            t.ctx.fillStyle = "rgba(" + this.color + ", " + a.toFixed(2) + ")", t.ctx.beginPath(), t.ctx.arc(0, 0, e, 0, 2 * Math.PI), t.ctx.fill()
    }
    t.ctx.restore()
}, Boom.prototype.elevation = function(t) {
    var e = t.yscale,
        a = 3;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e);
    var s = this.radius * (this.ttl / this.initial_ttl),
        i = this.ttl / this.initial_ttl;
    switch (this.style) {
        case "splat":
            t.ctx.strokeStyle = "rgba(" + this.color + ", " + i.toFixed(2) + ")", t.ctx.beginPath(), t.ctx.arc(0, 0, s / a, 0, 2 * Math.PI), t.ctx.stroke();
            break;
        case "zoom":
            for (var x = 0; 10 > x; x++) t.ctx.strokeStyle = "rgba(" + this.color + ", " + (1 - (x / 10).toFixed(2)) + ")", t.ctx.beginPath(), t.ctx.lineWidth = 8 * (x / 10), t.ctx.arc(0, 0, (this.radius - s) * x / (10 * a), 0, 2 * Math.PI), t.ctx.stroke();
            break;
        case "expand":
            s = this.initial_radius - this.radius * (this.ttl / this.initial_ttl), t.ctx.fillStyle = "rgba(" + this.color + ", " + i.toFixed(2) + ")", t.ctx.beginPath(), t.ctx.arc(0, 0, s / a, 0, 2 * Math.PI), t.ctx.fill();
            break;
        default:
            t.ctx.fillStyle = "rgba(" + this.color + ", " + i.toFixed(2) + ")", t.ctx.beginPath(), t.ctx.arc(0, 0, s / a, 0, 2 * Math.PI), t.ctx.fill()
    }
    t.ctx.restore()
}, Capital.prototype.update = function(t) {
    this.alert > 0 && this.alert--, this.defcon < 3 && this.mySats.length < this.sats_max && this.makeSat(), 0 === this.timer && this.calcDefcon(), this.timer += t, this.defcon < 2 ? (this.timer > 10 && (this.flash = !1), this.timer > 20 && (this.timer = 0, this.flash = !0)) : (this.timer > 10 && (this.flash = !1), this.timer > 50 && (this.timer = 0, this.flash = !0))
}, Capital.prototype.assetDestroyed = function() {
    this.defcon = 1
}, Capital.prototype.calcDefcon = function(t) {
    if (1 !== this.defcon) {
        var e, a, s;
        if (5 === this.defcon)
            for (e = 0, a = this.world.bombers.length; a > e; e++)
                if (s = this.world.bombers[e], s.capital !== this && this.pos.rangeXY(s.pos) < this.danger_close) {
                    this.defcon = 4, this.alert = 2;
                    break
                }
        if (4 === this.defcon)
            for (e = 0, a = this.world.bombers.length; a > e; e++)
                if (s = this.world.bombers[e], s.capital !== this && this.pos.rangeXY(s.pos) < this.danger_close / 2) {
                    this.defcon = 3, this.alert = 2;
                    break
                }
        if (3 === this.defcon)
            for (e = 0, a = this.world.bombers.length; a > e; e++)
                if (s = this.world.bombers[e], s.capital !== this && this.pos.rangeXY(s.pos) < this.danger_close / 3) {
                    this.defcon = 2, this.alert = 2;
                    break
                }
        for (e = 0, a = this.world.capitals.length; a > e; e++) 1 === this.world.capitals[e].defcon && (this.alert = 5, this.defcon = 1)
    }
}, Capital.prototype.makeSat = function() {
    var t = this.world.max_x / 2;
    this.pos.x < this.world.max_x / 2 ? t -= this.world.max_x / 2 * .05 : t += this.world.max_x / 2 * .05;
    var e = this.world.max_y / 2,
        a = new Sat({
            x: t,
            y: e,
            z: .9 * this.world.max_z,
            world: this.world,
            capital: this,
            color: this.color
        });
    this.world.sats.push(a), this.mySats.push(a)
}, Capital.prototype.addCities = function() {
    var t, e, a, s;
    for (Math.min(this.world.max_x, this.world.max_y) / 2; this.myCities.length < this.cities_max;) {
        var a, i = Math.PI / (this.cities_max + 1);
        a = this.rot - .5 * Math.PI, a += i * (this.myCities.length + 1), e = this.city_r, s = new VecR(a, e).vec3(), t = new City({
            x: this.pos.x + s.x,
            y: this.pos.y + s.y,
            z: 0,
            world: this.world,
            capital: this,
            unit_rate: this.unit_rate,
            abm_launch_max: this.abm_launch_max,
            stock: {
                abms: this.stock.abms
            },
            color: this.color
        }), this.myCities.push(t), this.world.cities.push(t)
    }
}, Capital.prototype.addFactories = function() {
    var t, e, a, s;
    for (Math.min(this.world.max_x, this.world.max_y) / 2; this.myFactories.length < this.factories_max;) {
        var a, i = Math.PI / (this.factories_max + 1);
        a = this.rot + Math.PI / 2, a += i * (this.myFactories.length + 1), e = this.factory_r, s = new VecR(a, e).vec3(), t = new Factory({
            x: this.pos.x + s.x,
            y: this.pos.y + s.y,
            world: this.world,
            capital: this,
            units: this.units,
            abm_launch_max: this.abm_launch_max,
            stock: {
                abms: this.stock.abms
            },
            color: this.color
        }), this.myFactories.push(t), this.world.factories.push(t)
    }
}, Capital.prototype.addBases = function() {
    var t, e, a, s;
    for (Math.min(this.world.max_x, this.world.max_y) / 2; this.myBases.length < this.bases_max;) {
        var a, i = Math.PI / (this.bases_max + 1);
        a = this.rot + Math.PI / 2, a += i * (this.myBases.length + 1), e = this.base_r, s = new VecR(a, e).vec3(), t = new Base({
            x: this.pos.x + s.x,
            y: this.pos.y + s.y,
            z: 0,
            world: this.world,
            capital: this,
            color: this.color,
            bomber_launch_max: Math.floor(this.bomber_launch_max * Math.random()),
            fighter_launch_max: Math.floor(this.fighter_launch_max * Math.random()),
            icbm_launch_max: this.icbm_launch_max,
            abm_launch_max: this.abm_launch_max,
            stock: {
                bombers: this.stock.bombers,
                fighters: this.stock.fighters,
                icbms: this.stock.icbms,
                abms: this.stock.abms
            }
        }), this.myBases.push(t), this.world.bases.push(t)
    }
}, Capital.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), 5 === this.defcon && (this.flash ? t.ctx.strokeStyle = this.color : t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",0.25)", t.ctx.lineWidth = .5, t.ctx.beginPath(), t.ctx.arc(0, 0, this.danger_close, 0, 2 * Math.PI), t.ctx.stroke()), 4 === this.defcon && this.alert > 0 && (t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.lineWidth = 8, t.ctx.beginPath(), t.ctx.arc(0, 0, this.danger_close, 0, 2 * Math.PI), t.ctx.stroke()), 4 === this.defcon && (this.flash ? t.ctx.strokeStyle = this.color : t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",0.25)", t.ctx.beginPath(), t.ctx.lineWidth = .5, t.ctx.arc(0, 0, this.danger_close / 2, 0, 2 * Math.PI), t.ctx.stroke()), 3 === this.defcon && this.alert > 0 && (t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.beginPath(), t.ctx.lineWidth = 8, t.ctx.arc(0, 0, this.danger_close / 2, 0, 2 * Math.PI), t.ctx.stroke()), 2 === this.defcon && this.alert > 0 && (t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.beginPath(), t.ctx.lineWidth = 8, t.ctx.arc(0, 0, this.city_r, 0, 2 * Math.PI), t.ctx.stroke()), t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",0.5)", t.ctx.lineWidth = .5, t.ctx.beginPath(), t.ctx.arc(0, 0, this.city_r, 0, 2 * Math.PI), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.arc(0, 0, this.factory_r, 0, 2 * Math.PI), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.arc(0, 0, this.base_r, 0, 2 * Math.PI), this.alert > 0 && (t.ctx.lineWidth = 4), t.ctx.stroke(), t.ctx.lineWidth = .5, this.flash ? t.ctx.fillStyle = this.color : t.ctx.fillStyle = "rgba(" + hex2rgb(this.color) + ",0.25)", t.ctx.lineWidth = 2, t.ctx.strokeStyle = this.color, t.ctx.beginPath(), t.ctx.rect(-12, -12, 24, 24), t.ctx.fill(), t.ctx.stroke(), this.flash ? t.ctx.fillStyle = "#000" : t.ctx.fillStyle = this.color, t.ctx.font = "12pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText(this.defcon, 0, 1), this.title && (t.ctx.fillStyle = this.color, t.ctx.font = "10pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText(this.title, 0, 32)), t.ctx.restore()
}, Capital.prototype.elevation = function(t) {
    var e = t.yscale;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e), 5 === this.defcon && (this.flash ? t.ctx.strokeStyle = this.color : t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",0.25)", t.ctx.lineWidth = .5, t.ctx.beginPath(), t.ctx.arc(0, 0, this.danger_close, 0, 2 * Math.PI), t.ctx.stroke()), 4 === this.defcon && this.alert > 0 && (t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.lineWidth = 8, t.ctx.beginPath(), t.ctx.arc(0, 0, this.danger_close, 0, 2 * Math.PI), t.ctx.stroke()), 4 === this.defcon && (this.flash ? t.ctx.strokeStyle = this.color : t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",0.25)", t.ctx.beginPath(), t.ctx.lineWidth = .5, t.ctx.arc(0, 0, this.danger_close / 2, 0, 2 * Math.PI), t.ctx.stroke()), 3 === this.defcon && this.alert > 0 && (t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.beginPath(), t.ctx.lineWidth = 8, t.ctx.arc(0, 0, this.danger_close / 2, 0, 2 * Math.PI), t.ctx.stroke()), 2 === this.defcon && this.alert > 0 && (t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.beginPath(), t.ctx.lineWidth = 8, t.ctx.arc(0, 0, this.city_r, 0, 2 * Math.PI), t.ctx.stroke()), t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",1)", t.ctx.lineWidth = .5, t.ctx.beginPath(), t.ctx.moveTo(-this.city_r, -1), t.ctx.lineTo(this.city_r, -1), t.ctx.stroke(), t.ctx.strokeStyle = "rgba(" + hex2rgb(this.color) + ",0.5)", t.ctx.lineWidth = .5, t.ctx.beginPath(), t.ctx.arc(0, 0, this.city_r, 0, 2 * Math.PI), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.arc(0, 0, this.factory_r, 0, 2 * Math.PI), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.arc(0, 0, this.base_r, 0, 2 * Math.PI), this.alert > 0 && (t.ctx.lineWidth = 4), t.ctx.stroke(), t.ctx.lineWidth = .5, this.flash ? t.ctx.fillStyle = this.color : t.ctx.fillStyle = "rgba(" + hex2rgb(this.color) + ",0.25)", t.ctx.lineWidth = 2, t.ctx.strokeStyle = this.color, t.ctx.beginPath(), t.ctx.rect(-6, -13, 12, 12), t.ctx.stroke(), t.ctx.fill(), t.ctx.restore()
}, City.prototype.update = function(t) {
    this.timer += t, this.timer > 15 && (this.distributions = !1), this.launchAbms(), this.timer > this.checkpoint && (this.timer = 0, this.distributeUnits()), this.units += this.unit_rate
}, City.prototype.addStock = function(t) {
    this.stock.abms += t.abms || 0
}, City.prototype.distributeUnits = function() {
    if (0 !== this.units && this.capital) {
        var t, e, a, s, i;
        for (a = this.world.factories, s = [], t = 0, e = a.length; e > t; t++) a[t].capital === this.capital && s.push(a[t]);
        if (0 !== s.length) {
            for (i = Math.floor(this.units / s.length), t = 0, e = s.length; e > t; t++) this.world.supplies.push(new Supply({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                color: this.color,
                capital: this.capital,
                target: s[t],
                units: i
            })), this.units = this.units - i;
            this.distributions = s
        }
    }
}, City.prototype.launchAbms = function() {
    var t, e, a = 0,
        s = 10;
    if (!(this.units.abms < s || this.stock.abms < 1 || this.abms_launched >= this.abm_launch_max)) {
        t = [];
        for (var i, x = this.world.max_x / 2, o = 0, l = this.world.icbms.length; l > o; o++) i = this.world.icbms[o], i.dead || i.capital !== this.capital && (this.pos.x < x ? i.pos.x < x && t.push(i) : i.pos.x > x && t.push(i));
        if (0 !== t.length)
            for (;
                (this.stock.abms > 0 || this.units > s) && this.abms_launched < this.abm_launch_max && a < this.abm_launch_per_tick;) e = pickOne(t), this.world.abms.push(new Abm({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                base: this,
                target: e,
                color: this.color
            })), a++, this.abms_launched++, this.stock.abms > 0 ? this.stock.abms = this.stock.abms - 1 : this.units = this.units - s--
    }
}, City.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.strokeStyle = this.color, t.ctx.lineWidth = 4, t.ctx.beginPath(), t.ctx.arc(0, 0, 12, 0, 2 * Math.PI), t.ctx.stroke(), t.ctx.fillStyle = "#000", t.ctx.fill(), t.ctx.fillStyle = this.color, t.ctx.font = "9pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", this.units > 0 && t.ctx.fillText(this.units.toFixed(0), 0, -24), this.title && (t.ctx.fillStyle = this.color, t.ctx.font = "10pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText(this.title, 0, 32)), t.ctx.restore()
}, City.prototype.elevation = function(t) {
    var e = t.yscale;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e - 1), t.ctx.lineWidth = 2, t.ctx.strokeStyle = this.color, t.ctx.fillStyle = "#000", t.ctx.beginPath(), t.ctx.arc(0, -6, 6, 0, 2 * Math.PI), t.ctx.stroke(), t.ctx.fill(), t.ctx.restore()
}, Decoy.prototype.update = function(t) {
    this.launch(), this.launchAbms()
}, Decoy.prototype.destroy = function() {
    console.log("destroy")
}, Decoy.prototype.launch = function() {
    var t, e, a, s;
    for (t = [], a = 0, s = this.world.decoys.length; s > a; a++) this.world.decoys[a].capital !== this.capital && t.push(this.world.decoys[a]);
    t.length > 0 && this.bombers_launched < this.bombers && (e = pickOne(t), this.world.bombers.push(new Bomber({
        x: this.pos.x,
        y: this.pos.y,
        world: this.world,
        base: this,
        capital: this.capital,
        target: e,
        color: this.color
    })), this.bombers_launched++), t.length > 0 && this.icbms_launched < this.icbms && (e = pickOne(t), this.world.icbms.push(new Icbm({
        x: this.pos.x,
        y: this.pos.y,
        world: this.world,
        base: this,
        capital: this.capital,
        target: e,
        color: this.color
    })), this.icbms_launched++), this.fighters_launched < this.fighters && (this.world.fighters.push(new Fighter({
        x: this.pos.x,
        y: this.pos.y,
        world: this.world,
        base: this,
        capital: this.capital,
        color: this.color
    })), this.fighters_launched++)
}, Decoy.prototype.launchAbms = function() {
    var t, e;
    if (!(this.abms_launched > this.abms)) {
        t = [];
        for (var a, s = .2 * this.world.max_x, i = 0, x = this.world.icbms.length; x > i; i++) a = this.world.icbms[i], a.dead || a.capital !== this.capital && Math.abs(a.pos.x - this.pos.x) < s && t.push(a);
        if (0 !== t.length)
            for (; this.abms_launched < this.abms;) e = pickOne(t), this.world.abms.push(new Abm({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                base: this,
                target: e,
                color: this.color
            })), this.abms_launched++
    }
}, Decoy.prototype.paint = function(t) {
    if (!this.hidden) {
        t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.strokeStyle = this.color, t.ctx.lineWidth = 2, t.ctx.beginPath(), t.ctx.moveTo(12, -12), t.ctx.lineTo(-12, 12), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.moveTo(12, 12), t.ctx.lineTo(-12, -12), t.ctx.stroke(), t.ctx.restore()
    }
}, Decoy.prototype.elevation = function(t) {
    if (!this.hidden) {
        var e = t.yscale;
        t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e - 1), t.ctx.strokeStyle = this.color, t.ctx.lineWidth = 1, t.ctx.beginPath(), t.ctx.moveTo(-6, -12), t.ctx.lineTo(6, 0), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.moveTo(6, -12), t.ctx.lineTo(-6, 0), t.ctx.stroke(), t.ctx.restore()
    }
}, Factory.prototype.update = function(t) {
    this.timer += t, this.timer > 15 && (this.distributions = !1), this.launchAbms(), this.timer > this.checkpoint && (this.timer = 0, this.makeMunitions())
}, Factory.prototype.addUnits = function(t) {
    this.units += t
}, Factory.prototype.makeMunitions = function() {
    if (0 !== this.units && this.capital) {
        var t, e, a, s, i;
        for (a = this.world.bases, s = [], t = 0, e = a.length; e > t; t++) a[t].capital === this.capital && s.push(a[t]);
        if (0 !== s.length) {
            for (this.amount.bombers += .025 * this.units, this.amount.fighters += .05 * this.units, this.amount.icbms += .001 * this.units, this.amount.abms += .01 * this.units, this.units = 0, i = {
                bombers: Math.floor(this.amount.bombers),
                fighters: Math.floor(this.amount.fighters),
                icbms: Math.floor(this.amount.icbms),
                abms: Math.floor(this.amount.abms)
            }, this.amount = {
                bombers: this.amount.bombers - i.bombers,
                fighters: this.amount.fighters - i.fighters,
                icbms: this.amount.icbms - i.icbms,
                abms: this.amount.abms - i.abms
            }, t = 0, e = s.length; e > t; t++) this.world.supplies.push(new Supply({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                color: this.color,
                capital: this.capital,
                target: s[t],
                stock: i
            }));
            this.distributions = s
        }
    }
}, Factory.prototype.launchAbms = function() {
    var t, e, a = 0,
        s = 10;
    if (!(this.units.abms < s || this.stock.abms < 1 || this.abms_launched >= this.abm_launch_max)) {
        t = [];
        for (var i, x = this.world.max_x / 2, o = 0, l = this.world.icbms.length; l > o; o++) i = this.world.icbms[o], i.dead || i.capital !== this.capital && (this.pos.x < x ? i.pos.x < x && t.push(i) : i.pos.x > x && t.push(i));
        if (0 !== t.length)
            for (;
                (this.stock.abms > 0 || this.units > s) && this.abms_launched < this.abm_launch_max && a < this.abm_launch_per_tick;) e = pickOne(t), this.world.abms.push(new Abm({
                x: this.pos.x,
                y: this.pos.y,
                world: this.world,
                base: this,
                target: e,
                color: this.color
            })), a++, this.abms_launched++, this.stock.abms > 0 ? this.stock.abms = this.stock.abms - 1 : this.units = this.units - s--
    }
}, Factory.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.strokeStyle = this.color, t.ctx.lineWidth = 2, t.ctx.beginPath(), t.ctx.moveTo(0, -12), t.ctx.lineTo(12, 12), t.ctx.lineTo(-12, 12), t.ctx.closePath(), t.ctx.fillStyle = "#000", t.ctx.fill(), t.ctx.stroke(), t.ctx.closePath(), t.ctx.fillStyle = this.color, t.ctx.font = "9pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", this.units > 0 && t.ctx.fillText(this.units.toFixed(0), 0, -24), this.title && (t.ctx.fillStyle = this.color, t.ctx.font = "10pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText(this.title, 0, 32)), t.ctx.restore()
}, Factory.prototype.elevation = function(t) {
    var e = t.yscale;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e - 1), t.ctx.strokeStyle = this.color, t.ctx.fillStyle = "#000", t.ctx.lineWidth = 2, t.ctx.beginPath(), t.ctx.moveTo(-6, 0), t.ctx.lineTo(0, -12), t.ctx.lineTo(6, 0), t.ctx.closePath(), t.ctx.stroke(), t.ctx.fill(), t.ctx.restore()
}, Fighter.prototype.update = function(t) {
    this.ttl--, this.ttl < 0 && (this.base.fighters_launched--, this.dead = !0), this.laser = null, this.laser_power < this.laser_max && this.laser_power++, this.hit && (this.hit--, 0 === this.hit && (this.hit = !1)), this.capital.defcon > 3 ? this.mode = "station" : this.mode = "attack", "station" === this.mode && this.pos.z < this.max_z && (this.pos.z += this.vel_z), "attack" === this.mode && this.pos.z < this.max_z && (this.pos.z += this.vel_z);
    var e = this.chase(),
        a = this.separation(),
        s = new Vec3;
    s.add(e.scale(.5)), s.add(a), s.scale(this.speed), this.velo.add(s), this.velo.limit(this.speed), this.pos.add(this.velo)
}, Fighter.prototype.chase = function() {
    var t, e, a, s, i, x, o, l = this.attack_range,
        c = this.attack_range * this.attack_range * this.attack_range;
    for (t = 0, e = this.world.bombers.length; e > t; t++) s = this.world.bombers[t], s.capital !== this.capital && (o = this.pos.rangeX(s.pos), o > this.attack_range || (i = this.pos.range(s.pos), l > i && (a = s, l = i)));
    if (!a)
        for (t = 0, e = this.world.fighters.length; e > t; t++) s = this.world.fighters[t], s.capital !== this.capital && (this.pos.rangeX(s.pos) > this.attack_range || (x = this.pos.range2(s.pos), c > x && (a = s, c = x)));
    return a ? (this.pos.range(a.pos) < this.laser_range && this.shoot(a), this.target = a, a.pos.minus(this.pos).normalize()) : this.station.minus(this.pos).normalize()
}, Fighter.prototype.separation = function() {
    var t, e, a, s, i, x = new Vec3,
        o = 0;
    for (t = 0, e = this.world.fighters.length; e > t; t++)
        if (i = this.world.fighters[t], i !== this && i !== this.target && (s = this.pos.rangeX(i.pos), !(s > this.separation_enemy) && (a = this.pos.rangeXY(i.pos), 0 !== a))) {
            if (i.capital === this.capital) {
                if (a > this.separation_friend) continue;
                x.add(this.pos.minusXY(i.pos).normalize().scale(this.separation_friend / a).scale(.25))
            } else {
                if (a > this.separation_enemy) continue;
                x.add(this.pos.minusXY(i.pos).normalize().scale(this.separation_enemy / a).scale(.25))
            }
            o++
        }
    for (t = 0, e = this.world.bombers.length; e > t; t++)
        if (i = this.world.bombers[t], i !== this && (s = this.pos.rangeX(i.pos), !(s > this.separation_enemy) && (a = this.pos.rangeXY(i.pos), 0 !== a))) {
            if (i.capital === this.capital) {
                if (a > this.separation_friend) continue;
                x.add(this.pos.minusXY(i.pos).normalize().scale(this.separation_friend / a).scale(.25))
            } else {
                if (a > this.separation_enemy) continue;
                x.add(this.pos.minusXY(i.pos).normalize().scale(this.separation_enemy / a).scale(.25))
            }
            o++
        }
    return this.target || (a = this.pos.rangeXY(this.station), a < this.separation_friend && x.add(this.pos.minusXY(this.station).normalize().scale(this.separation_friend / a).scale(.25)), o++), 0 === o ? new Vec3 : x.div(o)
}, Fighter.prototype.shoot = function(t) {
    this.laser_power <= 0 || (this.laser_power -= 2, this.laser = (new Vec3).copy(t.pos), t.damage())
}, Fighter.prototype.damage = function(t) {
    t || (t = 1), this.hp -= t, this.hit = 2, this.hp > 0 || this.dead || (this.base.fighters_launched--, this.dead = !0, this.world.booms.push(new Boom({
        world: this.world,
        radius: 15,
        ttl: 25,
        style: "",
        x: this.pos.x,
        y: this.pos.y,
        z: this.pos.z,
        color: hex2rgb(this.color)
    })))
}, Fighter.prototype.paint = function(t) {
    this.world.show_vectors && this.target && (t.ctx.beginPath(), t.ctx.strokeStyle = "rgba(255,255,255,0.25)", t.ctx.moveTo(this.pos.x, this.pos.y), t.ctx.lineTo(this.target.pos.x, this.target.pos.y), t.ctx.stroke()), this.laser && (t.ctx.beginPath(), t.ctx.lineWidth = 1, t.ctx.strokeStyle = "#0f0", t.ctx.moveTo(this.pos.x, this.pos.y), t.ctx.lineTo(this.laser.x, this.laser.y), t.ctx.stroke()), t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.velo.angleXY()), this.hit ? t.ctx.strokeStyle = "#f00" : t.ctx.strokeStyle = this.color;
    var e = 4;
    t.ctx.lineWidth = 2, t.ctx.beginPath(), t.ctx.moveTo(-e, -e), t.ctx.lineTo(0, 0), t.ctx.lineTo(-e, e), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.lineTo(0, 0), t.ctx.lineTo(e, 0), t.ctx.stroke(), t.ctx.restore()
}, Fighter.prototype.elevation = function(t) {
    var e = t.yscale;
    this.world.show_vectors && this.target && (t.ctx.beginPath(), t.ctx.strokeStyle = "rgba(255,255,255,0.25)", t.ctx.moveTo(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.lineTo(this.target.pos.x, (this.world.max_z - this.target.pos.z) * e), t.ctx.stroke()), t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.fillStyle = this.color, t.ctx.beginPath(), t.ctx.fillRect(-1, -1, 2, 2), t.ctx.restore(), this.laser && (t.ctx.beginPath(), t.ctx.lineWidth = 1, t.ctx.strokeStyle = "#f00", t.ctx.moveTo(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.lineTo(this.laser.x, (this.world.max_z - this.laser.z) * e), t.ctx.stroke())
}, Icbm.prototype.update = function(t) {
    this.ttl--, this.ttl < 0 && (this.base.icbms_launched--, this.dead = !0, this.world.booms.push(new Boom({
        world: this.world,
        radius: 10,
        ttl: 30,
        style: "",
        x: this.pos.x,
        y: this.pos.y - this.pos.z,
        color: hex2rgb(this.color, 8)
    })));
    var e = this.target.pos.minus(this.pos).normalize().scale(this.speed);
    this.velo.add(e), this.pos.add(this.velo), 0 === this.tickCount && (this.trail.push([this.pos.x, this.pos.y, this.pos.z]), this.tickCount = 20), this.tickCount--, this.range = this.pos.rangeXY(this.target.pos), this.range < this.killrange && (this.dead = !0, this.base.icbms_launched--, this.target.dead ? this.world.booms.push(new Boom({
        world: this.world,
        style: "",
        radius: 25,
        x: this.pos.x,
        y: this.pos.y - this.pos.z,
        color: hex2rgb(this.color)
    })) : (this.target.capital && this.target.capital.assetDestroyed(), "function" == typeof this.target.destroy ? this.target.destroy() : this.target.dead = !0, this.world.flash = 2, this.world.booms.push(new Boom({
        world: this.world,
        style: "zoom",
        radius: 40,
        ttl: 100,
        x: this.target.pos.x,
        y: this.target.pos.y,
        z: this.target.pos.z,
        color: hex2rgb("#f0f")
    })), this.world.booms.push(new Boom({
        world: this.world,
        style: "",
        radius: 60,
        ttl: 20,
        x: this.pos.x,
        y: this.pos.y,
        z: this.pos.z,
        color: hex2rgb("#fff")
    })))), this.distance > 0 && (this.phase = Math.sin(this.range / this.distance * Math.PI), this.phasec = Math.cos(this.range / this.distance * Math.PI)), this.pos.z = this.phase * this.world.max_z * .8
}, Icbm.prototype.destroy = function() {
    this.dead || (this.base.icbms_launched--, this.world.booms.push(new Boom({
        world: this.world,
        style: "",
        radius: 25,
        x: this.pos.x,
        y: this.pos.y,
        z: this.pos.z,
        color: hex2rgb(this.color)
    }))), this.dead = !0
}, Icbm.prototype.paint = function(t) {
    var e, a, s;
    if (this.trail.length > 0) {
        for (t.ctx.lineWidth = 1, t.ctx.strokeStyle = "rgba(255, 255, 255, 0.35)", t.ctx.beginPath(), t.ctx.moveTo(this.trail[0][0], this.trail[0][1]), e = 0, a = this.trail.length; a > e; e++) s = this.trail[e], t.ctx.lineTo(s[0], s[1]);
        t.ctx.lineTo(this.pos.x, this.pos.y), t.ctx.stroke()
    }
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(Math.PI), t.ctx.fillStyle = this.color;
    var i = 4;
    t.ctx.beginPath(), t.ctx.moveTo(2 * -this.direction * i, 0), t.ctx.lineTo(-this.direction * -i, -i), t.ctx.lineTo(-this.direction * -i, i), t.ctx.lineTo(2 * -this.direction * i, 0), t.ctx.closePath(), t.ctx.fill(), t.ctx.restore()
}, Icbm.prototype.elevation = function(t) {
    var e, a, s, i = t.yscale;
    if (this.trail.length > 0) {
        for (t.ctx.lineWidth = 1, t.ctx.strokeStyle = "rgba(255, 255, 255, 0.35)", t.ctx.beginPath(), t.ctx.moveTo(this.trail[0][0], (this.world.max_z - 2 * this.trail[0][2]) * i), e = 0, a = this.trail.length; a > e; e++) s = this.trail[e], t.ctx.lineTo(s[0], (this.world.max_z - s[2]) * i);
        t.ctx.lineTo(this.pos.x, (this.world.max_z - this.pos.z) * i), t.ctx.stroke()
    }
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * i), t.ctx.rotate(this.direction * (this.phasec + Math.PI)), t.ctx.fillStyle = this.color;
    var x = 3;
    t.ctx.lineWidth = 1, t.ctx.beginPath(), t.ctx.moveTo(2 * -this.direction * x, 0), t.ctx.lineTo(-this.direction * -x, -x), t.ctx.lineTo(-this.direction * -x, x), t.ctx.lineTo(2 * -this.direction * x, 0), t.ctx.closePath(), t.ctx.fill(), t.ctx.restore()
}, Interceptor.prototype.update = function(t) {
    this.ttl--, this.ttl < 0 && (this.silo.launched--, this.dead = !0, this.booms.push(new Boom({
        radius: 10,
        ttl: 30,
        style: "",
        x: this.pos.x,
        y: this.pos.y,
        color: "0,255,255"
    })));
    var e;
    (!this.target || this.target.dead) && (e = pickOne(this.bombs), e && (this.target = e));
    var a = this.target.pos.minus(this.pos).normalize().scale(this.speed);
    this.velo.add(a), this.pos.add(this.velo), this.velo.add(this.gravity);
    var s = this.pos.range(this.target.pos);
    s < this.sensitivity && (this.dead = !0, this.target.dead = !0, this.silo.launched--, this.booms.push(new Boom({
        style: "",
        radius: 25,
        x: this.pos.x,
        y: this.pos.y,
        color: "255,255,0"
    })))
}, Interceptor.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.velo.angleXY()), t.ctx.fillStyle = "#0cc", t.ctx.beginPath(), t.ctx.rect(-12, -2, 16, 2), t.ctx.fill(), t.ctx.restore()
}, Sat.prototype.update = function(t) {
    this.phase_x += this.speed_x, this.phase_y += this.speed_y, this.angle += this.rotation, this.pos.x = .5 * this.world.max_x + .1 * this.world.max_x * Math.sin(this.phase_x), this.pos.y = .5 * this.world.max_y + .3 * this.world.max_y * Math.sin(this.phase_y), this.laser = null, this.laser_power < this.laser_max && this.laser_power++, this.shootLaser()
}, Sat.prototype.shootLaser = function() {
    var t, e, a, s, i, x, o = this.laser_range + 1;
    for (t = 0, e = this.world.icbms.length; e > t; t++) s = this.world.icbms[t], s.capital !== this.capital && (x = this.pos.range(s.pos), x > this.laser_range || (i = this.pos.range(s.pos), i < this.laser_range && (o = i, a = s)));
    a && this.shoot(a)
}, Sat.prototype.shoot = function(t) {
    this.laser_power <= 0 || (this.laser_power -= 5, this.laser = (new Vec3).copy(t.pos), t.destroy())
}, Sat.prototype.paint = function(t) {
    this.laser && (t.ctx.beginPath(), t.ctx.lineWidth = 2, t.ctx.strokeStyle = "#fff", t.ctx.moveTo(this.pos.x, this.pos.y), t.ctx.lineTo(this.laser.x, this.laser.y), t.ctx.stroke()), t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.angle), t.ctx.beginPath(), t.ctx.lineWidth = 1, t.ctx.arc(0, 0, this.laser_range, 0, 2 * Math.PI), t.ctx.strokeStyle = "#222", t.ctx.stroke(), t.ctx.fillStyle = "#000", t.ctx.fillRect(-6, -6, 12, 12), t.ctx.fillStyle = this.color, t.ctx.strokeStyle = this.color, t.ctx.lineWidth = 2, t.ctx.beginPath(), t.ctx.moveTo(-6, -6), t.ctx.lineTo(6, 6), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.rect(-6, -6, 12, 12), t.ctx.stroke(), t.ctx.restore()
}, Sat.prototype.elevation = function(t) {
    var e = t.yscale;
    this.laser && (t.ctx.beginPath(), t.ctx.lineWidth = 1, t.ctx.strokeStyle = "#fff", t.ctx.moveTo(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.lineTo(this.laser.x, (this.world.max_z - this.laser.z) * e), t.ctx.stroke()), t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.beginPath(), t.ctx.lineWidth = 1, t.ctx.arc(0, 0, this.laser_range, 0, 2 * Math.PI), t.ctx.strokeStyle = "#222", t.ctx.stroke(), t.ctx.fillStyle = this.color, t.ctx.beginPath(), t.ctx.fillRect(-2, -2, 4, 4), t.ctx.restore()
}, Scanlines.prototype.update = function(t) {
    this.offset = this.offset + .25 * t, this.offset >= this.row_h && (this.offset = 0)
}, Scanlines.prototype.paint = function(t) {
    var e, a;
    for (a = t.h, e = 0; a > e; e += this.row_h) t.ctx.beginPath(), t.ctx.strokeStyle = "rgba(255, 255, 255, 0.15)", t.ctx.lineWidth = 2, t.ctx.moveTo(0, e - this.offset), t.ctx.lineTo(t.w, e - 2 - this.offset), t.ctx.stroke()
}, Silo.prototype.update = function(t) {
    for (var e, a = 0; this.stock > 0 && this.launched < this.launch_max && a < this.launch_per_tick && (e = pickOne(this.bombs));) e.h > .8 * this.h ? a++ : (this.interceptors.push(new Interceptor({
        x: this.pos.x,
        y: this.pos.y,
        silo: this,
        target: e,
        booms: this.booms,
        bombs: this.bombs
    })), this.launched++, a++, this.stock--);
    this.timer += t, this.timer > 10 && (this.flash = !1), this.timer > 75 && (this.timer = 0, this.flash = !0)
}, Silo.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.strokeStyle = this.color, t.ctx.fillStyle = "#000", t.ctx.lineWidth = 2, this.flash ? t.ctx.fillStyle = this.color : t.ctx.fillStyle = "#000", t.ctx.beginPath(), t.ctx.fillRect(-16, -16, 32, 32), t.ctx.strokeRect(-16, -16, 32, 32), t.ctx.fillStyle = "#0cc", t.ctx.font = "12pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText(this.stock, 0, 32), t.ctx.restore()
}, Streamer.prototype.update = function(t) {
    if (!this.target) return void(this.dead = !0);
    var e = this.target.pos.minus(this.pos).normalize().scale(this.speed);
    this.velo.add(e), this.pos.add(this.velo), this.velo.add(this.gravity), this.pos.y > this.target.pos.y && (this.dead = !0)
}, Streamer.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.rotate(this.velo.angleXY()), t.ctx.fillStyle = "#fff", t.ctx.beginPath(), t.ctx.rect(-12, -2, 24, 4), t.ctx.fill(), t.ctx.restore()
}, Supply.prototype.update = function(t) {
    if (this.ttl--, !this.target || this.target.dead) return void(this.dead = !0);
    var e = this.pos.rangeXY(this.target.pos);
    if (e <= this.supply_range) return this.units && this.target.addUnits(this.units), this.stock && this.target.addStock(this.stock), void(this.dead = !0);
    var a = this.target.pos.minus(this.pos).normalize();
    a.scale(this.speed), this.pos.add(a)
}, Supply.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y), t.ctx.fillStyle = "rgba(" + hex2rgb(this.color) + ", 0.5)", t.ctx.beginPath(), this.stock ? t.ctx.fillRect(-2, -2, 4, 4) : (t.ctx.beginPath(), t.ctx.arc(0, 0, 2, 0, 2 * Math.PI), t.ctx.closePath(), t.ctx.fill()), t.ctx.restore()
}, Supply.prototype.elevation = function(t) {
    var e = t.yscale;
    t.ctx.save(), t.ctx.translate(this.pos.x, (this.world.max_z - this.pos.z) * e), t.ctx.fillStyle = "rgba(" + hex2rgb(this.color) + ", 0.5)", this.stock ? t.ctx.fillRect(-3, -3, 2, 2) : (t.ctx.beginPath(), t.ctx.arc(-2, -2, 1, 0, 2 * Math.PI), t.ctx.closePath(), t.ctx.fill()), t.ctx.restore()
}, TheEnd.prototype.update = function(t) {
    this.age += this.rate * t, this.age > 4 * this.max && (this.dead = !0), this.rate *= 1.02, this.ix += .5, this.ix >= this.iy && (this.ix = 0)
}, TheEnd.prototype.paint = function(t) {
    t.ctx.save(), t.ctx.translate(this.pos.x, this.pos.y);
    this.age;
    t.ctx.beginPath(), t.ctx.fillStyle = this.colors[Math.floor(this.ix)], t.ctx.arc(0, 0, this.age, 0, 2 * Math.PI), t.ctx.fill(), t.ctx.beginPath(), t.ctx.fillStyle = "#000", t.ctx.arc(0, 0, this.age / 4, 0, 2 * Math.PI), t.ctx.fill(), t.ctx.fillStyle = "#000", t.ctx.font = "82pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText("THE END", 0, 0), t.ctx.fillStyle = this.colors[Math.floor(this.ix)], t.ctx.font = "80pt monospace", t.ctx.textBaseline = "middle", t.ctx.textAlign = "center", t.ctx.fillText("THE END", 0, 0), t.ctx.restore()
}, World.prototype.update = function(t) {
    this.flash > 0 && this.flash--
}, World.prototype.paint = function(t) {
    t.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)", t.ctx.lineWidth = 1, t.ctx.beginPath(), t.ctx.strokeRect(16, 16, this.max_x - 32, this.max_y - 32), t.ctx.stroke()
}, Scenes.actor = function(t, e) {
    function a() {
        f.x = .5 * f.max_x
    }

    function s() {
        a(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(c)
    }

    function i() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        m += (t - f.at) / 1e3, f.at = t, f.angle += f.angle_v, f.prevs.push(f.x), f.prevs.length > f.trails && f.prevs.shift(), f.x = f.x + f.v * e, f.x > .8 * f.max_x && (f.x = .5 * f.max_x), f.scanlines.update(e)
    }

    function x() {
        d.fx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(d.fx), d.fx.ctx.save(), d.fx.ctx.translate(d.fx.offset_x, d.fx.offset_y), d.fx.ctx.translate(Math.random(), Math.random()), d.fx.ctx.scale(d.fx.scale, d.fx.scale), l(), o(), d.fx.ctx.restore()
    }

    function o() {
        var t = 1;
        switch (d.fx.ctx.translate(.7 * f.max_x, .5 * f.max_y), d.fx.ctx.rotate(f.angle), d.fx.ctx.scale(128, 128), d.fx.ctx.fillStyle = "#0ff", d.fx.ctx.strokeStyle = "#0ff", f.type) {
            case "bomber":
                d.fx.ctx.lineWidth = .25, d.fx.ctx.beginPath(), d.fx.ctx.moveTo(t, 0), d.fx.ctx.lineTo(-t, -t), d.fx.ctx.lineTo(-t / 2, 0), d.fx.ctx.lineTo(-t, t), d.fx.ctx.lineTo(t, 0), d.fx.ctx.closePath(), d.fx.ctx.fill(), d.fx.ctx.stroke();
                break;
            case "fighter":
                d.fx.ctx.lineWidth = .5, d.fx.ctx.beginPath(), d.fx.ctx.moveTo(-t, -t), d.fx.ctx.lineTo(0, 0), d.fx.ctx.lineTo(-t, t), d.fx.ctx.stroke(), d.fx.ctx.beginPath(), d.fx.ctx.lineTo(0, 0), d.fx.ctx.lineTo(t, 0), d.fx.ctx.stroke();
                break;
            case "icbm":
                d.fx.ctx.beginPath(), d.fx.ctx.moveTo(2 * t, 0), d.fx.ctx.lineTo(-t, -t), d.fx.ctx.lineTo(-t, t), d.fx.ctx.lineTo(2 * t, 0), d.fx.ctx.closePath(), d.fx.ctx.fill();
                break;
            case "abm":
                d.fx.ctx.fillStyle = "#fff", d.fx.ctx.beginPath(), d.fx.ctx.fillRect(-.5, -.5, 1, 1);
                break;
            case "sat":
                d.fx.ctx.lineWidth = .25, d.fx.ctx.fillStyle = "#000", d.fx.ctx.fillRect(-1, -1, 2, 2), d.fx.ctx.fillStyle = "#0ff", d.fx.ctx.strokeStyle = "#0ff", d.fx.ctx.beginPath(), d.fx.ctx.moveTo(-1, -1), d.fx.ctx.lineTo(1, 1), d.fx.ctx.stroke(), d.fx.ctx.beginPath(), d.fx.ctx.rect(-1, -1, 2, 2), d.fx.ctx.stroke()
        }
        d.fx.ctx.restore()
    }

    function l() {
        var t = ["type", "mission", "speed", "range", "weapon"];
        d.fx.ctx.fillStyle = "#0f0", d.fx.ctx.font = "32pt ubuntu mono";
        for (var e = Math.floor(20 * m), a = 0, s = .35 * f.max_y, i = 0; i < t.length; i++) {
            var x, o, l;
            for (d.fx.ctx.textAlign = "right", d.fx.ctx.fillStyle = "#0f0", x = t[i], o = x.length, l = 0; e > a && o >= l;) d.fx.ctx.fillText(x.substr(o - l, l), .17 * f.max_x, s + 64 * i), l++, a++;
            for (d.fx.ctx.textAlign = "left", d.fx.ctx.fillStyle = "#fff", x = p[f.type][t[i]], o = x.length, l = 0; e > a && o >= l;) d.fx.ctx.fillText(x.substr(0, l), .19 * f.max_x, s + 64 * i), l++, a++
        }
    }

    function c() {
        i(), x(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, d.fx = {}, d.fx.wrap = document.getElementById("fx"), d.fx.el = document.getElementById("cfx"), d.fx.ctx = d.fx.el.getContext("2d"), d.fx.w = d.fx.wrap.offsetWidth, d.fx.h = d.fx.wrap.offsetHeight, d.fx.el.width = d.fx.w, d.fx.el.height = d.fx.h, d.fx.scale_x = d.fx.w / f.max_x, d.fx.scale_y = d.fx.h / f.max_y, d.fx.scale = Math.min(d.fx.scale_x, d.fx.scale_y), d.fx.offset_x = d.fx.w / 2 - f.max_x * d.fx.scale / 2, d.fx.offset_y = d.fx.h / 2 - f.max_y * d.fx.scale / 2, s()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.type = e.type, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.angle = 1.5 * Math.PI, this.angle_v = .01, this.prevs = [], this.trails = 15;
    var m = 0,
        d = {
            fx: null
        };
    this.scanlines = new Scanlines;
    var p = {
        bomber: {
            type: "BOMBER",
            mission: "destroy",
            speed: "slow",
            range: "long",
            weapon: "laser"
        },
        fighter: {
            type: "FIGHTER",
            mission: "intercept",
            speed: "fast",
            range: "medium",
            weapon: "laser"
        },
        icbm: {
            type: "ICBM",
            mission: "destroy",
            speed: "supersonic",
            range: "intercontinental",
            weapon: "warhead"
        },
        abm: {
            type: "ABM",
            mission: "intercept",
            speed: "fast",
            range: "short",
            weapon: "kinetic"
        },
        sat: {
            type: "SAT",
            mission: "intercept",
            speed: "fast",
            range: "orbital",
            weapon: "laser"
        }
    };
    return window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.airpower = function(t, e) {
    function a() {
        var t, e, a, s, i, o = Date.now(),
            l = Date.now(),
            c = h.delta = (l - h.at) / 16.77;
        for (h.at = l, h.world.update(), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].update(c), a[s].dead && (a.splice(s, 1), s--, i--);
        h.world.capitals.length <= 1 && !h.gameover && (h.gameover = !0, setTimeout(x, 5e3, h)), d.update = Date.now() - o
    }

    function s() {
        var t, e, a, s, i, x, o = Date.now();
        for (m.map.ctx.save(), m.map.ctx.clearRect(0, 0, m.map.w, m.map.h), m.map.ctx.translate(m.map.offset_x, m.map.offset_y), m.map.ctx.scale(m.map.scale, m.map.scale), m.elv.ctx.save(), m.elv.ctx.clearRect(0, 0, m.elv.w, m.elv.h), m.elv.ctx.translate(m.elv.offset_x, m.elv.offset_z), m.elv.ctx.scale(m.elv.scale, m.elv.scale), m.elv.ctx.clearRect(0, 0, m.elv.w, m.elv.h), h.world.flash && (m.map.ctx.fillStyle = "#ffffff", m.map.ctx.fillRect(0, 0, m.map.w, m.map.h)), h.world.flash && (m.elv.ctx.fillStyle = "#fff", m.elv.ctx.fillRect(0, 0, m.elv.w, m.elv.h)), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].paint(m.map), a[s].elevation(m.elv);
        m.map.ctx.restore(), m.elv.ctx.restore(), m.elv.ctx.fillStyle = "#999", m.elv.ctx.font = "14pt monospace", m.elv.ctx.textBaseline = "top", m.elv.ctx.textAlign = "left", m.elv.ctx.fillText("side view", 16, 0), m.map.ctx.fillStyle = "#999", m.map.ctx.font = "14pt monospace", m.map.ctx.textBaseline = "top", m.map.ctx.textAlign = "left", m.map.ctx.fillText("top view", 16, 32), d.paint = Date.now() - o, d.total = d.update + d.paint, h.gameover && Date.now() / 1e3 % 1 > .5 && (m.elv.ctx.fillStyle = "#f00", m.elv.ctx.font = "24pt monospace", m.elv.ctx.textBaseline = "middle", m.elv.ctx.textAlign = "center", m.elv.ctx.fillText("GAME OVER", m.elv.w / 2, m.elv.h / 2), m.map.ctx.fillStyle = "#f00", m.map.ctx.font = "32pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "center", m.map.ctx.fillText("GAME OVER", m.map.w / 2, m.map.h / 2)), h.show_meta && (x = h.w - 32, m.map.ctx.font = "16pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "right", m.map.ctx.fillStyle = "#999", d.update > 16 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.update + " update  ", x, 32), m.map.ctx.fillStyle = "#999", d.paint > 16 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.paint + " paint   ", x, 56), m.map.ctx.fillStyle = "#999", d.total > 16 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.total + " total   ", x, 80), m.map.ctx.font = "16pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "right", m.map.ctx.fillStyle = "#999", m.map.ctx.fillText(h.bombers.length + " bombers ", x, 120), m.map.ctx.fillText(h.fighters.length + " fighters", x, 144), m.map.ctx.fillText(h.icbms.length + " icbms   ", x, 168), m.map.ctx.fillText(h.abms.length + " abms    ", x, 192), m.map.ctx.fillText(h.booms.length + " booms   ", x, 216))
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {
        h.gameover = !1, h.world.booms = h.booms = [], h.world.capitals = [], h.world.cities = [], h.world.bases = [], h.world.factories = [], h.world.bombers = [], h.world.fighters = [], h.world.icbms = [], h.world.abms = [], h.world.sats = [], h.world.capitals.push(new Capital({
            x: .3 * h.world.max_x,
            y: .5 * h.world.max_y,
            z: 0,
            color: "#fc0",
            world: h.world,
            defcon: h.defcon,
            unit_rate: 0,
            bases_max: 1,
            cities_max: 1,
            factories_max: 1,
            sats_max: h.sats[0],
            bomber_launch_max: h.bomber_launch_max,
            fighter_launch_max: h.fighter_launch_max,
            icbm_launch_max: h.icbm_launch_max,
            abm_launch_max: h.abm_launch_max,
            stock: {
                bombers: h.bombers[0],
                fighters: h.fighters[0],
                icbms: h.icbms[0],
                abms: h.abms[0]
            }
        })), h.world.capitals.push(new Capital({
            x: .7 * h.world.max_x,
            y: .5 * h.world.max_y,
            z: 0,
            color: "#0ff",
            world: h.world,
            defcon: h.defcon,
            unit_rate: 0,
            bases_max: 1,
            cities_max: 1,
            factories_max: 1,
            sats_max: h.sats[1],
            bomber_launch_max: h.bomber_launch_max,
            fighter_launch_max: h.fighter_launch_max,
            icbm_launch_max: h.icbm_launch_max,
            abm_launch_max: h.abm_launch_max,
            stock: {
                bombers: h.bombers[1],
                fighters: h.fighters[1],
                icbms: h.icbms[1],
                abms: h.abms[1]
            }
        })), p = [h.world.capitals, h.world.cities, h.world.bases, h.world.factories, h.world.sats, h.world.bombers, h.world.fighters, h.world.icbms, h.world.abms, h.world.booms]
    }

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        var t;
        t = "", t += '<div id="map"><canvas id="cMap"></canvas></div>', t += '<div id="elevation"><canvas id="cElevation"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, m.map = {}, m.map.wrap = document.getElementById("map"), m.map.el = document.getElementById("cMap"), m.map.ctx = m.map.el.getContext("2d"), m.map.w = m.map.wrap.offsetWidth, m.map.h = m.map.wrap.offsetHeight, m.map.el.width = m.map.w, m.map.el.height = m.map.h, m.map.scale_x = m.map.w / h.world.max_x, m.map.scale_y = m.map.h / h.world.max_y, m.map.scale = Math.min(m.map.scale_x, m.map.scale_y), m.map.offset_x = m.map.w / 2 - h.world.max_x * m.map.scale / 2, m.map.offset_y = m.map.h / 2 - h.world.max_y * m.map.scale / 2, m.elv = {}, m.elv.wrap = document.getElementById("elevation"), m.elv.el = document.getElementById("cElevation"), m.elv.ctx = m.elv.el.getContext("2d"), m.elv.w = m.elv.wrap.offsetWidth, m.elv.h = m.elv.wrap.offsetHeight, m.elv.el.width = m.elv.w, m.elv.el.height = m.elv.h, m.elv.scale_x = m.elv.w / h.world.max_x, m.elv.scale_z = m.elv.h / (m.elv.h / h.world.max_z), m.elv.scale = m.elv.scale_x, m.elv.offset_x = m.elv.w / 2 - h.world.max_x * m.elv.scale / 2, m.elv.offset_y = m.elv.h / 2 - m.elv.h / h.world.max_z * m.elv.scale / 2, m.elv.yscale = m.elv.h / h.world.max_z / m.elv.scale, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.bombers = e.bombers || [0, 0], this.fighters = e.fighters || [0, 0], this.icbms = e.icbms || [0, 0], this.abms = e.abms || [0, 0], this.sats = e.sats || [0, 0], this.bomber_launch_max = e.bomber_launch_max || 1, this.fighter_launch_max = e.fighter_launch_max || 1, this.icbm_launch_max = e.icbm_launch_max || 1, this.abm_launch_max = e.abm_launch_max || 1, this.max_x = 1600, this.max_y = 500, this.max_z = 200;
    var f = 1;
    "Bomber" === e.title && (f = 3), h.world = new World({
        max_x: h.max_x,
        max_y: h.max_y,
        max_z: h.max_z,
        speed_factor: f
    }), this.show_meta = !1, this.gameover = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var m = {
        map: null,
        elevation: null
    }, d = {
            update: null,
            paint: null
        }, p = [];
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.attract = function(t, e) {
    function a() {
        var t, e, a, s, i, x = Date.now(),
            o = Date.now(),
            l = m.delta = (o - m.at) / 16.77;
        for (m.at = o, _ += l / 5, m.angle += m.angle_v, m.world.update(), t = 0, e = w.length; e > t; t++)
            for (a = w[t], s = 0, i = a.length; i > s; s++) a[s].update(l), a[s].dead && (a.splice(s, 1), s--, i--);
        if ("capital" === m.mode) {
            var c = 5 - Math.floor(_ / 30) % 5;
            c !== m.world.capitals[0].defcon && (m.world.capitals[0].defcon = c, m.world.capitals[0].alert = 2)
        }
        g.update = Date.now() - x
    }

    function s() {
        var t, e, a, s, o, l = Date.now();
        for (p.map.ctx.clearRect(0, 0, p.map.w, p.map.h), p.elv.ctx.clearRect(0, 0, p.elv.w, p.elv.h), m.world.flash && (p.map.ctx.fillStyle = "#fff", p.map.ctx.fillRect(0, 0, p.map.w, p.map.h), p.elv.ctx.fillStyle = "#fff", p.elv.ctx.fillRect(0, 0, p.elv.w, p.elv.h)), p.map.ctx.save(), p.map.ctx.translate(p.map.offset_x, p.map.offset_y), p.map.ctx.scale(p.map.scale, p.map.scale), p.elv.ctx.save(), p.elv.ctx.translate(p.elv.offset_x, p.elv.offset_z), p.elv.ctx.scale(p.elv.scale, p.elv.scale), t = 0, e = w.length; e > t; t++)
            for (a = w[t], s = 0, o = a.length; o > s; s++) a[s].paint(p.map), a[s].elevation(p.elv);
        var c = "#0ff";
        Math.random() < .05 && (c = "#0cc"), Math.random() < .01 && (c = "#099"), p.map.ctx.fillStyle = c, p.map.ctx.font = "32pt ubuntu mono", p.map.ctx.textBaseline = "middle", p.map.ctx.textAlign = "center", p.map.ctx.save(), p.map.ctx.translate(Math.random(), Math.random()), p.map.ctx.fillText(m.mode, .7 * m.max_x, 12), p.map.ctx.restore(), p.map.ctx.save(), p.map.ctx.translate(.7 * m.max_x, .3 * m.max_y);
        var n;
        "capital" === m.mode && (n = "detects and commands", m.world.capitals[0].flash ? p.map.ctx.fillStyle = c : p.map.ctx.fillStyle = "rgba(" + hex2rgb(c) + ",0.25)", p.map.ctx.strokeStyle = c, p.map.ctx.lineWidth = 8, p.map.ctx.beginPath(), p.map.ctx.rect(-50, -50, 100, 100), p.map.ctx.fill(), p.map.ctx.stroke(), m.world.capitals[0].flash ? p.map.ctx.fillStyle = "#000" : p.map.ctx.fillStyle = c, p.map.ctx.font = "48pt ubuntu mono", p.map.ctx.textBaseline = "middle", p.map.ctx.textAlign = "center", p.map.ctx.fillText(m.world.capitals[0].defcon, 0, 3)), "city" === m.mode && (n = "provides labor", p.map.ctx.strokeStyle = c, p.map.ctx.fillStyle = c, p.map.ctx.lineWidth = 8, p.map.ctx.beginPath(), p.map.ctx.arc(0, 0, 50, 0, 2 * Math.PI), p.map.ctx.stroke()), "factory" === m.mode && (n = "builds munitions", p.map.ctx.strokeStyle = c, p.map.ctx.fillStyle = c, p.map.ctx.lineWidth = 8, p.map.ctx.beginPath(), p.map.ctx.beginPath(), p.map.ctx.moveTo(0, -50), p.map.ctx.lineTo(50, 50), p.map.ctx.lineTo(-50, 50), p.map.ctx.closePath(), p.map.ctx.stroke()), "base" === m.mode && (n = "stockpiles munitions", p.map.ctx.strokeStyle = c, p.map.ctx.fillStyle = c, p.map.ctx.lineWidth = 8, p.map.ctx.beginPath(), p.map.ctx.rect(-50, -50, 100, 100), p.map.ctx.stroke(), p.map.ctx.fillStyle = c, p.map.ctx.font = "24pt ubuntu mono", p.map.ctx.textBaseline = "middle", m.world.bases[0].stock.bombers > 0 && (p.map.ctx.textAlign = "right", p.map.ctx.fillStyle = c, p.map.ctx.fillText(m.world.bases[0].stock.bombers, -70, -30), p.map.ctx.fillStyle = "#999", p.map.ctx.fillText("bombers", -140, -30)), m.world.bases[0].stock.fighters > 0 && (p.map.ctx.textAlign = "right", p.map.ctx.fillStyle = c, p.map.ctx.fillText(m.world.bases[0].stock.fighters, -70, 30), p.map.ctx.fillStyle = "#999", p.map.ctx.fillText("fighters", -140, 30)), m.world.bases[0].stock.icbms > 0 && (p.map.ctx.textAlign = "left", p.map.ctx.fillStyle = c, p.map.ctx.fillText(m.world.bases[0].stock.icbms, 70, -30), p.map.ctx.fillStyle = "#999", p.map.ctx.fillText("icbms", 140, -30)), m.world.bases[0].stock.abms > 0 && (p.map.ctx.textAlign = "left", p.map.ctx.fillStyle = c, p.map.ctx.fillText(m.world.bases[0].stock.abms, 70, 30), p.map.ctx.fillStyle = "#999", p.map.ctx.fillText("abms", 140, 30))), "bomber" === m.mode && (i("bomber"), x("bomber")), "fighter" === m.mode && (i("fighter"), x("fighter")), "icbm" === m.mode && (i("icbm"), x("icbm")), "abm" === m.mode && (i("abm"), x("abm")), "sat" === m.mode && (i("sat"), x("sat")), p.map.ctx.restore(), n && (p.map.ctx.fillStyle = c, p.map.ctx.font = "24pt ubuntu mono", p.map.ctx.textBaseline = "middle", p.map.ctx.textAlign = "center", _ < n.length && (n = n.substr(0, Math.floor(_))), p.map.ctx.save(), p.map.ctx.translate(Math.random(), Math.random()), p.map.ctx.fillText(n, .7 * m.max_x, .6 * m.max_y), p.map.ctx.restore()), p.map.ctx.restore(), p.elv.ctx.restore(), p.elv.ctx.fillStyle = "#999", p.elv.ctx.font = "14pt ubuntu mono", p.elv.ctx.textBaseline = "top", p.elv.ctx.textAlign = "left", p.elv.ctx.fillText("side view", 16, 16), p.map.ctx.fillStyle = "#999", p.map.ctx.font = "14pt ubuntu mono", p.map.ctx.textBaseline = "top", p.map.ctx.textAlign = "left", p.map.ctx.fillText("top view", 16, 16), g.paint = Date.now() - l, g.total = g.update + g.paint
    }

    function i(t) {
        var e = 64;
        p.map.ctx.rotate(m.angle);
        var a = "#0ff";
        switch (Math.random() < .05 && (a = "#0cc"), Math.random() < .01 && (a = "#099"), p.map.ctx.fillStyle = a, p.map.ctx.strokeStyle = a, t) {
            case "bomber":
                p.map.ctx.lineWidth = 1, p.map.ctx.beginPath(), p.map.ctx.moveTo(e, 0), p.map.ctx.lineTo(-e, -e), p.map.ctx.lineTo(-e / 2, 0), p.map.ctx.lineTo(-e, e), p.map.ctx.lineTo(e, 0), p.map.ctx.closePath(), p.map.ctx.fill(), p.map.ctx.stroke();
                break;
            case "fighter":
                p.map.ctx.lineWidth = 24, p.map.ctx.beginPath(), p.map.ctx.moveTo(-e, -e), p.map.ctx.lineTo(0, 0), p.map.ctx.lineTo(-e, e), p.map.ctx.stroke(), p.map.ctx.beginPath(), p.map.ctx.lineTo(0, 0), p.map.ctx.lineTo(e, 0), p.map.ctx.stroke();
                break;
            case "icbm":
                e = 48, p.map.ctx.beginPath(), p.map.ctx.moveTo(2 * e, 0), p.map.ctx.lineTo(-e, -e), p.map.ctx.lineTo(-e, e), p.map.ctx.lineTo(2 * e, 0), p.map.ctx.closePath(), p.map.ctx.fill();
                break;
            case "abm":
                p.map.ctx.fillStyle = "#0ff", p.map.ctx.beginPath(), p.map.ctx.fillRect(.5 * -e, .5 * -e, e, e);
                break;
            case "sat":
                p.map.ctx.lineWidth = 16, p.map.ctx.fillStyle = "#000", p.map.ctx.fillRect(-e, -e, 2 * e, 2 * e), p.map.ctx.fillStyle = "#0ff", p.map.ctx.strokeStyle = "#0ff", p.map.ctx.beginPath(), p.map.ctx.moveTo(-e, -e), p.map.ctx.lineTo(e, e), p.map.ctx.stroke(), p.map.ctx.beginPath(), p.map.ctx.rect(-e, -e, 2 * e, 2 * e), p.map.ctx.stroke()
        }
        p.map.ctx.restore()
    }

    function x(t) {
        var e = ["type", "mission", "speed", "range", "weapon", "activate"];
        p.map.ctx.save(), p.map.ctx.translate(.5 * m.max_x, .55 * m.max_y), p.map.ctx.fillStyle = "#0f0", p.map.ctx.font = "24pt ubuntu mono";
        for (var a = Math.floor(2 * _), s = 0, i = 0, x = 0; x < e.length; x++) {
            var o, l, c;
            for (p.map.ctx.textAlign = "right", p.map.ctx.fillStyle = "#0f0", Math.random() < .05 && (p.map.ctx.fillStyle = "#090"), Math.random() < .01 && (p.map.ctx.fillStyle = "#060"), o = e[x], l = o.length, c = 0; a > s && l >= c;) p.map.ctx.save(), p.map.ctx.translate(Math.random(), Math.random()), p.map.ctx.fillText(o.substr(l - c, c), .18 * m.max_x, i + 40 * x), p.map.ctx.restore(), c++, s++;
            for (p.map.ctx.textAlign = "left", p.map.ctx.fillStyle = "#fff", Math.random() < .05 && (p.map.ctx.fillStyle = "#999"), Math.random() < .01 && (p.map.ctx.fillStyle = "#666"), o = u[t][e[x]], l = o.length, c = 0; a > s && l >= c;) p.map.ctx.save(), p.map.ctx.translate(Math.random(), Math.random()), p.map.ctx.fillText(o.substr(0, c), .2 * m.max_x, i + 40 * x), p.map.ctx.restore(), c++, s++
        }
    }

    function o() {
        a(), s(), m.stopped || (m.raf = window.requestAnimationFrame(o))
    }

    function l() {
        m.gameover = !1, m.world.booms = m.booms = [], m.world.capitals = [], m.world.cities = [], m.world.bases = [], m.world.factories = [], m.world.supplies = [], m.world.bombers = [], m.world.fighters = [], m.world.icbms = [], m.world.abms = [], m.world.sats = [], m.world.decoys = [];
        var t;
        if ("capital" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 5,
            unit_rate: 0,
            bases_max: 0,
            cities_max: 0,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 0,
                fighters: 0,
                icbms: 0,
                abms: 0
            }
        })), "city" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 5,
            unit_rate: 0,
            bases_max: 0,
            cities_max: 1,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 0,
                fighters: 0,
                icbms: 0,
                abms: 0
            }
        })), "factory" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 5,
            unit_rate: 0,
            bases_max: 0,
            cities_max: 1,
            factories_max: 1,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 0,
                fighters: 0,
                icbms: 0,
                abms: 0
            }
        })), "base" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 5,
            unit_rate: 1,
            bases_max: 1,
            cities_max: 2,
            factories_max: 2,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 0,
                fighters: 0,
                icbms: 0,
                abms: 0
            }
        })), "bomber" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 5,
            unit_rate: 0,
            bases_max: 1,
            cities_max: 0,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 1,
                fighters: 0,
                icbms: 0,
                abms: 0
            }
        }), m.world.decoys.push(new Decoy({
            x: .55 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: y,
            color: "#f0f",
            hidden: !1,
            world: m.world
        })), m.world.decoys.push(new Decoy({
            x: .262 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: t,
            color: "#fc0",
            world: m.world,
            hidden: !0,
            bombers: !0
        }))), "fighter" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 4,
            unit_rate: 0,
            bases_max: 1,
            cities_max: 0,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: 0,
            fighter_launch_max: 0,
            icbm_launch_max: 0,
            abm_launch_max: 0,
            stock: {
                bombers: 0,
                fighters: 1,
                icbms: 0,
                abms: 0
            }
        }), m.world.decoys.push(new Decoy({
            x: .55 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: y,
            color: "#f0f",
            hidden: !1,
            world: m.world,
            bombers: !0
        })), m.world.decoys.push(new Decoy({
            x: .262 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: t,
            color: "#fc0",
            world: m.world,
            hidden: !0,
            fighters: 10
        }))), "icbm" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 3,
            unit_rate: 0,
            bases_max: 1,
            cities_max: 0,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 0,
                fighters: 0,
                icbms: 1,
                abms: 0
            }
        }), m.world.decoys.push(new Decoy({
            x: .55 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: y,
            color: "#f0f",
            hidden: !1,
            world: m.world
        })), m.world.decoys.push(new Decoy({
            x: .262 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: t,
            color: "#fc0",
            world: m.world,
            hidden: !0,
            icbms: 1
        }))), "abm" == m.mode && (t = new Capital({
            x: .2 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world,
            defcon: 3,
            unit_rate: 0,
            bases_max: 1,
            cities_max: 0,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: 1,
            fighter_launch_max: 1,
            icbm_launch_max: 1,
            abm_launch_max: 1,
            stock: {
                bombers: 0,
                fighters: 0,
                icbms: 0,
                abms: 1
            }
        }), m.world.decoys.push(new Decoy({
            x: .55 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: y,
            color: "#f0f",
            hidden: !1,
            world: m.world,
            icbms: 1
        })), m.world.decoys.push(new Decoy({
            x: .262 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            capital: t,
            color: "#fc0",
            world: m.world,
            hidden: !0,
            abms: 20
        }))), "sat" == m.mode) {
            t = new Capital({
                x: .2 * m.world.max_x,
                y: .5 * m.world.max_y,
                z: 0,
                color: "#fc0",
                world: m.world,
                defcon: 2,
                unit_rate: 0,
                bases_max: 1,
                cities_max: 0,
                factories_max: 0,
                sats_max: 0,
                bomber_launch_max: 1,
                fighter_launch_max: 1,
                icbm_launch_max: 1,
                abm_launch_max: 1,
                stock: {
                    bombers: 0,
                    fighters: 0,
                    icbms: 0,
                    abms: 0
                }
            });
            var e = new Sat({
                x: .5 * m.world.max_x,
                y: .5 * m.world.max_y,
                z: .9 * m.world.max_z,
                world: m.world,
                capital: y,
                color: "#f0f"
            });
            m.world.sats.push(e), m.world.decoys.push(new Decoy({
                x: .55 * m.world.max_x,
                y: .5 * m.world.max_y,
                z: 0,
                capital: y,
                color: "#f0f",
                hidden: !1,
                world: m.world,
                icbms: 0
            })), m.world.decoys.push(new Decoy({
                x: .262 * m.world.max_x,
                y: .5 * m.world.max_y,
                z: 0,
                capital: t,
                color: "#fc0",
                world: m.world,
                hidden: !0,
                icbms: 1
            }))
        }
        m.world.capitals.push(t), w = [m.world.capitals, m.world.cities, m.world.bases, m.world.factories, m.world.sats, m.world.bombers, m.world.supplies, m.world.fighters, m.world.icbms, m.world.abms, m.world.booms, m.world.decoys]
    }

    function c() {
        l(), m.stopped = !1, m.at = Date.now(), m.raf = window.requestAnimationFrame(o)
    }

    function n() {
        var t;
        t = "", t += '<div id="map"><canvas id="cMap"></canvas></div>', t += '<div id="elevation"><canvas id="cElevation"></canvas></div>', m.el.innerHTML = t, m.w = m.el.offsetWidth, m.h = m.el.offsetHeight, p.map = {}, p.map.wrap = document.getElementById("map"), p.map.el = document.getElementById("cMap"), p.map.ctx = p.map.el.getContext("2d"), p.map.w = p.map.wrap.offsetWidth, p.map.h = p.map.wrap.offsetHeight, p.map.el.width = p.map.w, p.map.el.height = p.map.h, p.map.scale_x = p.map.w / m.world.max_x, p.map.scale_y = p.map.h / m.world.max_y, p.map.scale = Math.min(p.map.scale_x, p.map.scale_y), p.map.offset_x = p.map.w / 2 - m.world.max_x * p.map.scale / 2, p.map.offset_y = p.map.h / 2 - m.world.max_y * p.map.scale / 2, p.elv = {}, p.elv.wrap = document.getElementById("elevation"), p.elv.el = document.getElementById("cElevation"), p.elv.ctx = p.elv.el.getContext("2d"), p.elv.w = p.elv.wrap.offsetWidth, p.elv.h = p.elv.wrap.offsetHeight, p.elv.el.width = p.elv.w, p.elv.el.height = p.elv.h, p.elv.scale_x = p.elv.w / m.world.max_x, p.elv.scale_z = p.elv.h / (p.elv.h / m.world.max_z), p.elv.scale = p.elv.scale_x, p.elv.offset_x = p.elv.w / 2 - m.world.max_x * p.elv.scale / 2, p.elv.offset_y = p.elv.h / 2 - p.elv.h / m.world.max_z * p.elv.scale / 2, p.elv.yscale = p.elv.h / m.world.max_z / p.elv.scale, c()
    }

    function r() {
        m.stopped = !0
    }

    function h() {
        m.show_meta = !m.show_meta
    }

    function f() {
        m.stopped || (r(), setTimeout(n, 100))
    }
    var m = this;
    this.el = t, this.mode = e.mode, this.max_x = 1600, this.max_y = 500, this.max_z = 200;
    var d = 1;
    "Bomber" === e.title && (d = 3), m.world = new World({
        max_x: m.max_x,
        max_y: m.max_y,
        max_z: m.max_z,
        speed_factor: d
    }), this.show_meta = !1, this.gameover = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var p = {
        map: null,
        elevation: null
    }, g = {
            update: null,
            paint: null
        };
    this.angle = 1.5 * Math.PI, this.angle_v = .01;
    var _ = 0,
        w = [],
        u = {
            bomber: {
                type: "BOMBER",
                mission: "destroy",
                speed: "slow",
                range: "long",
                weapon: "laser",
                activate: "defcon 5"
            },
            fighter: {
                type: "FIGHTER",
                mission: "intercept",
                speed: "fast",
                range: "medium",
                weapon: "laser",
                activate: "defcon 4"
            },
            icbm: {
                type: "ICBM",
                mission: "destroy",
                speed: "supersonic",
                range: "intercontinental",
                weapon: "warhead",
                activate: "defcon 3"
            },
            abm: {
                type: "ABM",
                mission: "intercept",
                speed: "fast",
                range: "short",
                weapon: "hi-ex",
                activate: "auto"
            },
            sat: {
                type: "SAT",
                mission: "intercept",
                speed: "fast",
                range: "orbital",
                weapon: "laser",
                activate: "defcon 2"
            }
        }, y = new Capital({
            x: .8 * m.world.max_x,
            y: .5 * m.world.max_y,
            z: 0,
            color: "#fc0",
            world: m.world
        });
    return window.onresize = f, {
        start: n,
        stop: r,
        toggleMeta: h
    }
}, Scenes.basic = function(t, e) {
    function a() {}

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.scanlines.update(e)
    }

    function x() {
        f.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", f.fx.ctx.fillRect(0, 0, h.w, h.h), Math.random() < .005 && (f.fx.ctx.fillStyle = "rgba(255, 0, 0, 1)"), f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.save(), f.fx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.fx.ctx.scale(f.gx.scale, f.gx.scale), f.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.gx), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.scale(f.gx.scale, f.gx.scale), o(), f.gx.ctx.restore(), f.fx.ctx.restore()
    }

    function o() {
        var t = h.code;
        f.fx.ctx.fillStyle = "#0ff", Math.random() < .05 && (f.fx.ctx.fillStyle = "#099"), Math.random() < .01 && (f.fx.ctx.fillStyle = "#066"), f.fx.ctx.font = "48pt ubuntu mono", f.fx.ctx.save(), Math.random() < .01 && f.fx.ctx.translate(16 * (Math.random() - .5), 16 * (Math.random() - .5));
        for (var e = .2 * h.max_y, a = 0; a < t.length; a++) f.fx.ctx.save(), Math.random() < .0025 && f.fx.ctx.rotate(2 * Math.PI * Math.random()), f.fx.ctx.translate(1 * Math.random(), 1 * Math.random()), f.fx.ctx.fillText(t[a], .2 * h.max_x, e + 80 * a), f.fx.ctx.restore();
        f.fx.ctx.restore()
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2, f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.el = document.getElementById("cgx"), f.gx.ctx = f.gx.el.getContext("2d"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.scale_x = f.gx.w / h.max_x, f.gx.scale_y = f.gx.h / h.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.max_y * f.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.code = e.code;
    var f = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.boids = function(t, e) {
    function a() {
        var t, e, a = Date.now(),
            i = Date.now(),
            x = m.delta = (i - m.at) / 16.77;
        m.at = i, m.world.update();
        var o = 0,
            l = 0,
            c = 0;
        for (t = 0, e = m.boids.length; e > t; t++) o += m.boids[t].x, l += m.boids[t].y, c++;
        for (o /= c, l /= c, t = 0, e = m.boids.length; e > t; t++) s(m.boids[t], x, o, l);
        p.update = Date.now() - a
    }

    function s(t, e, a, s) {
        var i, x, o, l, c, n, r, h, f, d, p = m.world.max_x / 16;
        m.world.max_y / 16;
        for (d = t.a, c = t.v * Math.cos(d), n = t.v * Math.sin(d), i = 0, x = 0, o = 0, l = m.boids.length; l > o; o++) h = m.boids[o], h !== t && (f = _.distance(h.x, h.y, t.x, t.y), 0 !== f && 2 * p > f && (d = _.angle(h.x, h.y, t.x, t.y), i -= Math.cos(d) * (1 / f), x -= Math.sin(d) * (1 / f)));
        for (c += t.v * i * .7, n += t.v * x * .7, i = 0, x = 0, r = 0, o = 0, l = m.boids.length; l > o; o++) h = m.boids[o], h !== t && (i += .1 * Math.cos(h.a), x += .1 * Math.sin(h.a), r++);
        r > 0 && (c += t.v * (i / r), n += t.v * (x / r)), d = _.angle(a, s, t.x, t.y), c += t.v * Math.cos(d) * .05, n += t.v * Math.sin(d) * .05, t.x += c, t.y += n, t.a = Math.atan2(n, c), t.x < 0 && (t.x = m.world.max_x), t.x > m.world.max_x && (t.x = 0), t.y < 0 && (t.y = m.world.max_y), t.y > m.world.max_y && (t.y = 0)
    }

    function i() {
        var t, e, a = Date.now(),
            s = 8;
        for (d.fx.ctx.save(), d.fx.ctx.clearRect(0, 0, d.fx.w, d.fx.h), d.fx.ctx.translate(d.fx.offset_x, d.fx.offset_y), d.fx.ctx.scale(d.fx.scale, d.fx.scale), t = 0, e = m.boids.length; e > t; t++) {
            var i = m.boids[t];
            d.fx.ctx.save(), d.fx.ctx.translate(i.x, i.y), d.fx.ctx.rotate(i.a), d.fx.ctx.fillStyle = "#fff", d.fx.ctx.lineWidth = 1, d.fx.ctx.beginPath(), d.fx.ctx.moveTo(s, 0), d.fx.ctx.lineTo(-s, -s), d.fx.ctx.lineTo(-s / 2, 0), d.fx.ctx.lineTo(-s, s), d.fx.ctx.lineTo(s, 0), d.fx.ctx.closePath(), d.fx.ctx.fill(), d.fx.ctx.restore()
        }
        p.paint = Date.now() - a, p.total = p.update + p.paint, d.fx.ctx.restore(), m.show_meta && (d.fx.ctx.font = "16pt monospace", d.fx.ctx.textBaseline = "middle", d.fx.ctx.textAlign = "right", d.fx.ctx.fillStyle = "#999", p.update > 16 && (d.fx.ctx.fillStyle = "#f00"), d.fx.ctx.fillText(p.update + " update", m.w - 32, 32), d.fx.ctx.fillStyle = "#999", p.paint > 16 && (d.fx.ctx.fillStyle = "#f00"), d.fx.ctx.fillText(p.paint + " paint ", m.w - 32, 56), d.fx.ctx.fillStyle = "#999", p.total > 16 && (d.fx.ctx.fillStyle = "#f00"), d.fx.ctx.fillText(p.total + " total ", m.w - 32, 80))
    }

    function x() {
        a(), i(), m.stopped || (m.raf = window.requestAnimationFrame(x))
    }

    function o(t) {
        var e = {
            x: m.world.max_x / 2,
            y: m.world.max_y / 2,
            a: 2 * Math.random() * Math.PI,
            v: (5 + 10 * Math.random()) / 2
        };
        return e
    }

    function l() {
        for (; m.boids.length < m.boids_max;) m.boids.push(o());
        g = document.createElement("canvas"), g.width = 16, g.height = 16;
        var t = g.getContext("2d");
        t.fillStyle = "#fff", t.lineWidth = 2, t.beginPath(), t.moveTo(16, 8), t.lineTo(0, 0), t.lineTo(4, 8), t.lineTo(0, 16), t.lineTo(16, 8), t.closePath(), t.fill()
    }

    function c() {
        l(), m.stopped = !1, m.at = Date.now(), m.raf = window.requestAnimationFrame(x)
    }

    function n() {
        m.el.innerHTML = "", m.el.innerHTML = '<div id="fx"><canvas id="cfx"></canvas></div>', m.w = m.el.offsetWidth, m.h = m.el.offsetHeight, d.fx = {}, d.fx.wrap = document.getElementById("fx"), d.fx.w = d.fx.wrap.offsetWidth, d.fx.h = d.fx.wrap.offsetHeight, d.fx.el = document.getElementById("cfx"), d.fx.el.width = d.fx.w, d.fx.el.height = d.fx.h, d.fx.ctx = d.fx.el.getContext("2d"), d.fx.scale_x = d.fx.w / m.world.max_x, d.fx.scale_y = d.fx.h / m.world.max_y, d.fx.scale = Math.min(d.fx.scale_x, d.fx.scale_y), d.fx.offset_x = d.fx.w / 2 - m.world.max_x * d.fx.scale / 2, d.fx.offset_y = d.fx.h / 2 - m.world.max_y * d.fx.scale / 2, c()
    }

    function r() {
        m.stopped = !0
    }

    function h() {
        m.show_meta = !m.show_meta
    }

    function f() {
        m.stopped || (r(), setTimeout(n, 100))
    }
    var m = this;
    this.el = t, this.world = new World({
        max_x: 1600,
        max_y: 900
    }), this.show_meta = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var d = {
        fx: null
    }, p = {
            update: null,
            paint: null
        };
    this.boids_max = e.boids_max || 150, this.boids = [];
    var g, _ = {
            angle: function(t, e, a, s) {
                var i = t - a,
                    x = e - s;
                return Math.atan2(x, i)
            },
            distance: function(t, e, a, s) {
                var i = Math.abs(t - a),
                    x = Math.abs(e - s);
                return Math.sqrt(i * i + x * x)
            }
        };
    return window.onresize = f, {
        start: n,
        stop: r,
        toggleMeta: h
    }
}, Scenes.canvas = function(t, e) {
    function a() {
        f.y = .11 * f.max_y
    }

    function s() {
        a(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(c)
    }

    function i() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        f.at = t, f.prevs.push(f.y), f.prevs.length > f.trails && f.prevs.shift(), f.y = f.y + f.v * e, f.y > f.max_y && (f.y = .1 * f.max_y), f.scanlines.update(e)
    }

    function x() {
        m.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", m.fx.ctx.fillRect(0, 0, f.w, f.h), m.fx.ctx.save(), m.fx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.fx.ctx.scale(m.gx.scale, m.gx.scale), m.gx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(m.gx), m.gx.ctx.save(), m.gx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.gx.ctx.scale(m.gx.scale, m.gx.scale), o(), l(), m.gx.ctx.restore(), m.fx.ctx.restore()
    }

    function o() {
        m.gx.ctx.fillStyle = "#f0f", m.gx.ctx.beginPath(), m.gx.ctx.fillRect(.9 * f.max_x - 64, f.y - 128, 128, 128), m.gx.ctx.fill(), m.fx.ctx.fillStyle = "#0ff", m.fx.ctx.beginPath(), m.fx.ctx.fillRect(.9 * f.max_x - 64, f.y - 128, 128, 128), m.fx.ctx.fill()
    }

    function l() {
        var t = ["", '// <canvas id="myCanvas" />', "var el = document.getElementById('myCanvas');", "var ctx = el.getContext('2d');", "", "function paint(){", "  ctx.clearRect(0, 0, w, h);", "  ctx.fillStyle = '#f0f';", "  ctx.fillRect(x, y, 1, 1);", "}"];
        m.gx.ctx.save(), m.gx.ctx.translate(Math.random(), Math.random()), m.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (m.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (m.gx.ctx.fillStyle = "#090"), m.gx.ctx.font = "32pt ubuntu mono";
        for (var e = .1 * f.max_y, a = 0; a < t.length; a++) m.gx.ctx.fillText(t[a], .1 * f.max_x, e + 56 * a);
        m.gx.ctx.restore()
    }

    function c() {
        i(), x(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx" /></div><div id="gx"><canvas id="cgx" /></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / f.max_x, m.fx.scale_y = m.fx.h / f.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - f.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - f.max_y * m.fx.scale / 2, m.gx = {}, m.gx.wrap = document.getElementById("gx"), m.gx.el = document.getElementById("cgx"), m.gx.ctx = m.gx.el.getContext("2d"), m.gx.w = m.gx.wrap.offsetWidth, m.gx.h = m.gx.wrap.offsetHeight, m.gx.el.width = m.gx.w, m.gx.el.height = m.gx.h, m.gx.scale_x = m.gx.w / f.max_x, m.gx.scale_y = m.gx.h / f.max_y, m.gx.scale = Math.min(m.gx.scale_x, m.gx.scale_y), m.gx.offset_x = m.gx.w / 2 - f.max_x * m.gx.scale / 2, m.gx.offset_y = m.gx.h / 2 - f.max_y * m.gx.scale / 2, s()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.y = .5 * this.max_y, this.v = 4, this.prevs = [], this.trails = 15;
    var m = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.capitals = function(t, e) {
    function a() {}

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.scanlines.update(e)
    }

    function x() {
        f.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.save(), f.fx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.fx.ctx.scale(f.gx.scale, f.gx.scale), f.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.gx), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.scale(f.gx.scale, f.gx.scale), o(), f.gx.ctx.restore(), f.fx.ctx.restore()
    }

    function o() {
        var t = ["world.capitals.push(new Capital({", "  x: world.max_x * 0.5,", "  y: world.max_y * 0.5,", "  z: 0", "}));"];
        f.gx.ctx.fillStyle = "#0f0", f.gx.ctx.font = "32pt monospace";
        for (var e = .1 * h.max_y, a = 0; a < t.length; a++) f.gx.ctx.fillText(t[a], .1 * h.max_x, e + 56 * a)
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2,
        f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.el = document.getElementById("cgx"), f.gx.ctx = f.gx.el.getContext("2d"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.scale_x = f.gx.w / h.max_x, f.gx.scale_y = f.gx.h / h.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.max_y * f.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700;
    var f = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.civilization = function(t, e) {
    function a() {
        var t, e, a, s, i, x = Date.now(),
            o = Date.now(),
            l = h.delta = (o - h.at) / 16.77;
        for (h.at = o, h.world.update(), t = 0, e = d.length; e > t; t++)
            for (a = d[t], s = 0, i = a.length; i > s; s++) a[s].update(l), a[s].dead && (a.splice(s, 1), s--, i--);
        m.update = Date.now() - x
    }

    function s() {
        var t, e, a, s, i, x = Date.now();
        for (f.map.ctx.save(), f.map.ctx.clearRect(0, 0, f.map.w, f.map.h), f.map.ctx.translate(f.map.offset_x, f.map.offset_y), f.map.ctx.scale(f.map.scale, f.map.scale), t = 0, e = d.length; e > t; t++)
            for (a = d[t], s = 0, i = a.length; i > s; s++) a[s].paint(f.map);
        f.map.ctx.restore(), m.paint = Date.now() - x, m.total = m.update + m.paint
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {
        h.world.booms = h.booms = [], h.world.capitals = h.capitals = [], h.world.cities = h.cities = [], h.world.bases = h.bases = [], h.world.factories = h.factories = [], h.world.supplies = h.supplies = [], h.world.bombers = h.bombers = [], h.world.fighters = h.fighters = [], h.world.icbms = h.icbms = [], h.world.abms = h.abms = [], h.world.sats = h.sats = [];
        var t = new Capital({
            title: "Capital",
            x: .5 * h.world.max_x,
            y: .3 * h.world.max_y,
            z: 0,
            color: "#0ff",
            defcon: h.defcon,
            world: h.world,
            unit_rate: h.unit_rate,
            units: h.units,
            bases_max: 0,
            cities_max: 0,
            factories_max: 0,
            sats_max: 0,
            bomber_launch_max: h.bomber_launch_max,
            fighter_launch_max: h.fighter_launch_max,
            icbm_launch_max: h.icbm_launch_max,
            abm_launch_max: h.abm_launch_max,
            stock: {
                bombers: h.stock.bombers,
                fighters: h.stock.fighters,
                icbms: h.stock.icbms,
                abms: h.stock.abms
            }
        });
        h.capitals.push(t);
        var e = new City({
            x: .2 * h.world.max_x,
            y: .5 * h.world.max_y,
            z: 0,
            world: h.world,
            capital: t,
            unit_rate: h.unit_rate,
            color: t.color,
            title: "City"
        });
        h.world.cities.push(e);
        var a = new Factory({
            x: .5 * h.world.max_x,
            y: .7 * h.world.max_y,
            z: 0,
            world: h.world,
            capital: t,
            color: t.color,
            title: "Factory"
        });
        h.world.factories.push(a);
        var s = new Base({
            x: .8 * h.world.max_x,
            y: .5 * h.world.max_y,
            z: 0,
            world: h.world,
            capital: t,
            color: t.color,
            title: "Base"
        });
        h.world.bases.push(s), d = [h.supplies, h.capitals, h.cities, h.bases, h.factories, h.sats, h.bombers, h.fighters, h.icbms, h.abms, h.booms]
    }

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.map = {}, f.map.wrap = document.getElementById("fx"), f.map.el = document.getElementById("cfx"), f.map.ctx = f.map.el.getContext("2d"), f.map.w = f.map.wrap.offsetWidth, f.map.h = f.map.wrap.offsetHeight, f.map.el.width = f.map.w, f.map.el.height = f.map.h, f.map.scale_x = f.map.w / h.world.max_x, f.map.scale_y = f.map.h / h.world.max_y, f.map.scale = Math.min(f.map.scale_x, f.map.scale_y), f.map.offset_x = f.map.w / 2 - h.world.max_x * f.map.scale / 2, f.map.offset_y = f.map.h / 2 - h.world.max_y * f.map.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.max_x = 400, this.max_y = 400, this.max_z = 100, h.world = new World({
        max_x: h.max_x,
        max_y: h.max_y,
        max_z: h.max_z
    }), this.defcon = e.defcon || 1, this.show_meta = !1, this.unit_rate = e.unit_rate || 0, this.units = e.unit || 0, this.bases_max = e.bases_max || 0, this.cities_max = e.cities_max || 0, this.factories_max = e.factories_max || 0, this.bomber_launch_max = e.bomber_launch_max || 0, this.fighter_launch_max = e.fighter_launch_max || 0, this.icbm_launch_max = e.icbm_launch_max || 0, this.abm_launch_max = e.abm_launch_max || 0, this.sats_max = e.sats_max || 0, this.stock = e.stock || {
        bombers: 0,
        fighters: 0,
        icbms: 0,
        abms: 0
    }, this.raf = null, this.stopped = !1, this.at = 0;
    var f = {
        fx: null,
        side: null
    }, m = {
            update: null,
            paint: null
        }, d = [];
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.code = function(t, e) {
    function a() {}

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.scanlines.update(e)
    }

    function x() {
        f.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", f.fx.ctx.fillRect(0, 0, h.w, h.h), Math.random() < .005 && (f.fx.ctx.fillStyle = "rgba(255, 255, 255, 1)"), f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.save(), Math.random() < .0025 && f.fx.ctx.rotate(2 * Math.PI * Math.random()), f.fx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.fx.ctx.scale(f.gx.scale, f.gx.scale), f.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.gx), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.scale(f.gx.scale, f.gx.scale), o(), f.gx.ctx.restore(), f.fx.ctx.restore()
    }

    function o() {
        var t = h.code;
        f.fx.ctx.fillStyle = "#0f0", Math.random() < .05 && (f.fx.ctx.fillStyle = "#090"), Math.random() < .01 && (f.fx.ctx.fillStyle = "#060"), f.fx.ctx.font = "32pt ubuntu mono", f.fx.ctx.save(), Math.random() < .005 && f.fx.ctx.translate(32 * (Math.random() - .5), 32 * (Math.random() - .5));
        for (var e = .05 * h.max_y, a = 0; a < t.length; a++) f.fx.ctx.save(), Math.random() < .0025 && f.fx.ctx.rotate(2 * Math.PI * Math.random()), f.fx.ctx.translate(1 * (Math.random() - .5), 1 * (Math.random() - .5)), f.fx.ctx.fillText(t[a], .1 * h.max_x, e + 56 * a), f.fx.ctx.restore();
        f.fx.ctx.restore()
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2, f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.el = document.getElementById("cgx"), f.gx.ctx = f.gx.el.getContext("2d"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.scale_x = f.gx.w / h.max_x, f.gx.scale_y = f.gx.h / h.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.max_y * f.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.code = e.code;
    var f = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.coldwar = function(t, e) {
    function a() {
        var t, e, a, s, i, o = Date.now(),
            l = Date.now(),
            c = f.delta = (l - f.at) / 16.77;
        for (f.at = l, f.world.update(), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].update(c), a[s].dead && (a.splice(s, 1), s--, i--);
        f.capitals.length <= 1 && !f.gameover && (f.gameover = !0, setTimeout(x, 5e3, f)), d.update = Date.now() - o
    }

    function s() {
        var t, e, a, s, i, x = Date.now();
        for (m.map.ctx.save(), m.map.ctx.clearRect(0, 0, m.map.w, m.map.h), f.world.flash && (m.map.ctx.fillStyle = "#ffffff", m.map.ctx.fillRect(0, 0, m.map.w, m.map.h)), m.map.ctx.translate(m.map.offset_x, m.map.offset_y), m.map.ctx.scale(m.map.scale, m.map.scale), m.elv.ctx.save(), m.elv.ctx.clearRect(0, 0, m.elv.w, m.elv.h), f.world.flash && (m.elv.ctx.fillStyle = "#fff", m.elv.ctx.fillRect(0, 0, m.elv.w, m.elv.h)), m.elv.ctx.translate(m.elv.offset_x, m.elv.offset_z), m.elv.ctx.scale(m.elv.scale, m.elv.scale), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].paint(m.map), a[s].elevation(m.elv);
        m.map.ctx.restore(), m.elv.ctx.restore(), d.paint = Date.now() - x, d.total = d.update + d.paint, f.gameover && Date.now() / 1e3 % 1 > .5 && (m.elv.ctx.fillStyle = "#f00", m.elv.ctx.font = "24pt monospace", m.elv.ctx.textBaseline = "middle", m.elv.ctx.textAlign = "center", m.elv.ctx.fillText("GAME OVER", m.elv.w / 2, m.elv.h / 2), m.map.ctx.fillStyle = "#f00", m.map.ctx.font = "32pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "center", m.map.ctx.fillText("GAME OVER", m.map.w / 2, m.map.h / 2))
    }

    function i() {
        a(), s(), f.stopped || (f.raf = window.requestAnimationFrame(i))
    }

    function x() {
        f.gameover = !1, f.world.booms = f.booms = [], f.world.capitals = f.capitals = [], f.world.cities = f.cities = [], f.world.bases = f.bases = [], f.world.factories = f.factories = [], f.world.supplies = f.supplies = [], f.world.bombers = f.bombers = [], f.world.fighters = f.fighters = [], f.world.icbms = f.icbms = [], f.world.abms = f.abms = [], f.world.sats = f.sats = [];
        var t = [{
            x: .2 * f.world.max_x,
            y: .5 * f.world.max_y,
            z: 0,
            color: "#fc0"
        }, {
            x: .8 * f.world.max_x,
            y: .5 * f.world.max_y,
            z: 0,
            color: "#0ff"
        }];
        f.first_strike ? (t.forEach(function(t, e) {
            t.strike = !1
        }), t[Math.floor(Math.random() * t.length)].strike = !0) : t.forEach(function(t) {
            t.strike = !0
        }), t.forEach(function(t) {
            f.capitals.push(new Capital({
                x: t.x,
                y: t.y,
                z: t.z,
                color: t.color,
                world: f.world,
                strike: t.strike,
                defcon: f.defcon,
                unit_rate: f.unit_rate,
                bases_max: f.bases_max,
                cities_max: f.cities_max,
                factories_max: f.factories_max,
                sats_max: f.sats_max,
                bomber_launch_max: f.bomber_launch_max,
                fighter_launch_max: f.fighter_launch_max,
                icbm_launch_max: f.icbm_launch_max,
                abm_launch_max: f.abm_launch_max,
                stock: {
                    bombers: f.stock_bombers,
                    fighters: f.stock_fighters,
                    icbms: f.stock_icbms,
                    abms: f.stock_abms
                }
            }))
        }), p = [f.supplies, f.capitals, f.cities, f.bases, f.factories, f.bombers, f.fighters, f.icbms, f.abms, f.booms, f.sats]
    }

    function o() {
        x(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(i)
    }

    function l() {
        var t;
        t = "", t += '<div id="map" class="has-controls"><canvas id="cMap"></canvas></div>', t += '<div id="elevation" class="has-controls"><canvas id="cElevation"></canvas></div>', t += '<div id="params"><h3>Cold War</h3><p><a href="https://twitter.com/simon_swain" target="new">@simon_swain</a></p></div>', t += '<div id="options"></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.map = {}, m.map.wrap = document.getElementById("map"), m.map.el = document.getElementById("cMap"), m.map.ctx = m.map.el.getContext("2d"), m.map.w = m.map.wrap.offsetWidth, m.map.h = m.map.wrap.offsetHeight, m.map.el.width = m.map.w, m.map.el.height = m.map.h, m.map.scale_x = m.map.w / f.world.max_x, m.map.scale_y = m.map.h / f.world.max_y, m.map.scale = Math.min(m.map.scale_x, m.map.scale_y), m.map.offset_x = m.map.w / 2 - f.world.max_x * m.map.scale / 2, m.map.offset_y = m.map.h / 2 - f.world.max_y * m.map.scale / 2, m.elv = {}, m.elv.wrap = document.getElementById("elevation"), m.elv.el = document.getElementById("cElevation"), m.elv.ctx = m.elv.el.getContext("2d"), m.elv.w = m.elv.wrap.offsetWidth, m.elv.h = m.elv.wrap.offsetHeight, m.elv.el.width = m.elv.w, m.elv.el.height = m.elv.h, m.elv.scale_x = m.elv.w / f.world.max_x, m.elv.scale_z = m.elv.h / (m.elv.h / f.world.max_z), m.elv.scale = m.elv.scale_x, m.elv.offset_x = m.elv.w / 2 - f.world.max_x * m.elv.scale / 2, m.elv.offset_y = m.elv.h / 2 - m.elv.h / f.world.max_z * m.elv.scale / 2, m.elv.yscale = m.elv.h / f.world.max_z / m.elv.scale;
        var e, a = document.getElementById("params"),
            s = document.getElementById("options");
        e = document.createElement("div"), e.innerHTML = "<button>Restart</label>", e.classList.add("restart"), a.appendChild(e), e.getElementsByTagName("button")[0].onclick = h, e = document.createElement("div"), t = "", t += '<label id="first_strike" title="First Strike">first_strike</label>', t += '<input type="checkbox" value="1" for="first_strike" />', e.innerHTML = t, s.appendChild(e), f.first_strike && (e.getElementsByTagName("input")[0].checked = !0), e.getElementsByTagName("input")[0].addEventListener("change", function(t) {
            f.first_strike = t.target.checked
        }), f.params.forEach(function(t) {
            var e, a = document.createElement("div");
            e = "", e += '<label title="' + t.info + '">' + t.key + "</label>", e += '<input type="number" value="' + f[t.key] + '" />', a.innerHTML = e, s.appendChild(a), a.getElementsByTagName("input")[0].addEventListener("change", function(e) {
                var a = Number(e.target.value);
                return a > t.max ? (a = t.max, void(e.target.value = a)) : a < t.min ? (a = t.min, void(e.target.value = a)) : void(f[t.key] = a)
            }, !1)
        }), o()
    }

    function c() {
        f.stopped = !0
    }

    function n() {
        f.show_meta = !f.show_meta
    }

    function r() {
        f.world.show_vectors = !f.world.show_vectors
    }

    function h() {
        f.stopped || (c(), setTimeout(l, 100))
    }
    var f = this;
    this.el = t, this.show_meta = !1, this.max_x = 1600, this.max_y = 500, this.max_z = 200, this.world = new World({
        max_x: f.max_x,
        max_y: f.max_y,
        max_z: f.max_z
    }), this.params = [{
        key: "defcon",
        info: "Defcon",
        min: 1,
        max: 5
    }, {
        key: "bases_max",
        info: "Number of Bases each Nation State starts with",
        min: 0,
        max: 5
    }, {
        key: "cities_max",
        info: "Number of Cities each Nation State starts with",
        min: 0,
        max: 5
    }, {
        key: "factories_max",
        info: "Number of Factories each Nation State starts with",
        min: 0,
        max: 5
    }, {
        key: "units",
        info: "Starting Units for Factory",
        min: 0,
        max: 1e3
    }, {
        key: "unit_rate",
        info: "Unit Production Rate for Factories",
        min: 1,
        max: 5
    }, {
        key: "stock_bombers",
        info: "Number of Bombers each Base starts with",
        min: 0,
        max: 1e3
    }, {
        key: "stock_fighters",
        info: "Number of Fighters each Base starts with",
        min: 0,
        max: 1e3
    }, {
        key: "stock_icbms",
        info: "Number ICBMs each Base starts with. ICBMs launch intermittently below Defcon3. At Defcon 1, they all launch.",
        min: 0,
        max: 1e3
    }, {
        key: "stock_abms",
        info: "Number ABMs each Base starts with. ABMs launch when ICBMs get close.",
        min: 0,
        max: 1e3
    }, {
        key: "fighter_launch_max",
        info: "Number of Fighters each Base can have in air at any time.",
        min: 0,
        max: 100
    }, {
        key: "bomber_launch_max",
        info: "Number of Bombers each Base can have in air at any time.",
        min: 0,
        max: 100
    }, {
        key: "icbm_launch_max",
        info: "Number of ICBMs each Base can have in air at any time.",
        min: 0,
        max: 100
    }, {
        key: "abm_launch_max",
        info: "Number of ABMs each Base can have in air at any time",
        min: 0,
        max: 100
    }, {
        key: "sats_max",
        info: "Number of Satellites each Capital can have. Sats launch at Defcon 3.",
        min: 0,
        max: 10
    }], this.first_strike = e.first_strike || !1, this.capital_count = 2, this.defcon = 5, this.unit_rate = 1, this.units = 0, this.bases_max = 3, this.cities_max = 3, this.factories_max = 3, this.bomber_launch_max = 10, this.fighter_launch_max = 10, this.icbm_launch_max = 5, this.abm_launch_max = 10, this.sats_max = 1, this.stock_bombers = 0, this.stock_fighters = 0, this.stock_icbms = 0, this.stock_abms = 0, this.gameover = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var m = {
        map: null,
        elevation: null
    }, d = {
            update: null,
            paint: null
        }, p = [];
    return {
        start: l,
        stop: c,
        toggleMeta: n,
        toggleVectors: r
    }
}, Scenes.crt = function(t, e) {
    function a() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        f += (t - h.at) / 750, h.at = t, d += _, d >= 18 && (d = 0, m++, m >= p.length && (m = 0, _ = 2 * _, _ > 1 && (_ = 1))), h.scanlines.update(e)
    }

    function s() {
        var t, t, e, a = (Date.now(), 96),
            s = p[m];
        t = Math.floor(d % 6), e = Math.floor(d / 6), g.ex.ctx.fillStyle = "rgba(0, 0, 0, 0.5)", g.ex.ctx.fillRect(0, 0, h.w, h.h), g.ex.ctx.save(), g.ex.ctx.translate(g.ex.offset_x, g.ex.offset_y), g.ex.ctx.scale(g.ex.scale, g.ex.scale), g.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.03)", g.fx.ctx.fillRect(0, 0, h.w, h.h), g.fx.ctx.save(), g.fx.ctx.translate(g.fx.offset_x, g.fx.offset_y), g.fx.ctx.scale(g.fx.scale, g.fx.scale), g.gx.ctx.save(), g.gx.ctx.clearRect(0, 0, g.gx.w, g.gx.h), h.scanlines.paint(g.gx), g.gx.ctx.translate(g.gx.offset_x, g.gx.offset_y), g.gx.ctx.scale(g.gx.scale, g.gx.scale), g.fx.ctx.save(), g.fx.ctx.translate(h.world.max_x / 2 - 3 * a, h.world.max_y / 2 - 1.5 * a), g.fx.ctx.scale(a, 1.4 * a), g.gx.ctx.save(), g.gx.ctx.translate(h.world.max_x / 2 - 3 * a, h.world.max_y / 2 - 1.5 * a), g.gx.ctx.scale(a, 1.4 * a), g.fx.lineWidth = 0, g.gx.lineWidth = 0, g.fx.ctx.lineWidth = .025, g.fx.ctx.strokeStyle = "#000", g.gx.ctx.lineWidth = .05, g.gx.ctx.fillStyle = "#fff", g.gx.ctx.strokeStyle = "#fff", "1" === s[e][t] && (g.gx.ctx.lineWidth = .025, g.gx.ctx.strokeStyle = "rgba(0, 255, 255, 0.7)", g.gx.ctx.beginPath(), g.gx.ctx.moveTo(-.5, 1), g.gx.ctx.lineTo(1.5, 1), g.gx.ctx.lineTo(3.8 + .6 * t, e), g.gx.ctx.stroke(), 0 === e && (g.gx.ctx.fillStyle = "rgba(0, 255, 0, 0.8)", g.gx.ctx.beginPath(), g.gx.ctx.rect(1.3, .75, .4, .1), g.gx.ctx.fill(), g.gx.ctx.fillStyle = "rgba(0, 255, 0, .25)", g.gx.ctx.beginPath(), g.gx.ctx.rect(1.3, 1.15, .4, .1), g.gx.ctx.fill()), 1 === e && (g.gx.ctx.fillStyle = "rgba(0, 255, 0, .25)", g.gx.ctx.beginPath(), g.gx.ctx.rect(1.3, .75, .4, .1), g.gx.ctx.fill(), g.gx.ctx.fillStyle = "rgba(0, 255, 0, 0.25)", g.gx.ctx.beginPath(), g.gx.ctx.rect(1.3, 1.15, .4, .1), g.gx.ctx.fill()), 2 === e && (g.gx.ctx.fillStyle = "rgba(0, 255, 0, .25)", g.gx.ctx.beginPath(), g.gx.ctx.rect(1.3, .75, .4, .1), g.gx.ctx.fill(), g.gx.ctx.fillStyle = "rgba(0, 255, 0, 1)", g.gx.ctx.beginPath(), g.gx.ctx.rect(1.3, 1.15, .4, .1), g.gx.ctx.fill()), g.fx.ctx.strokeStyle = "#fff", g.fx.ctx.fillStyle = "rgba(255, 255, 255, 0.8)", g.fx.ctx.beginPath(), g.fx.ctx.rect(3.8 + .6 * t, e - .3, .4, .6), g.fx.ctx.fill(), g.fx.ctx.stroke()), g.fx.ctx.fillStyle = "rgba(255, 255, 255, 1)", g.fx.ctx.strokeStyle = "rgba(255, 255, 255, 1)", g.fx.ctx.beginPath(), g.fx.ctx.moveTo(-2, .5), g.fx.ctx.lineTo(-2, 1.5), g.fx.ctx.lineTo(0, 1.5), g.fx.ctx.lineTo(3, 3), g.fx.ctx.lineTo(3.2, 3), g.fx.ctx.lineTo(3.2, -1.5), g.fx.ctx.lineTo(3, -1.5), g.fx.ctx.lineTo(0, .5), g.fx.ctx.lineTo(-2, .5), g.fx.ctx.stroke(), g.fx.ctx.beginPath(), g.fx.ctx.rect(3.2, -1.5, 4.5, 4.5), g.fx.ctx.stroke(), g.gx.ctx.restore(), g.fx.ctx.restore(), g.gx.ctx.restore(), g.fx.ctx.restore(), g.ex.ctx.restore()
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {}

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        h.el.innerHTML = "", h.el.innerHTML = '<div id="ex"><canvas id="cex"></canvas></div><div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, g.ex = {}, g.ex.wrap = document.getElementById("ex"), g.ex.w = g.ex.wrap.offsetWidth, g.ex.h = g.ex.wrap.offsetHeight, g.ex.el = document.getElementById("cex"), g.ex.el.width = g.ex.w, g.ex.el.height = g.ex.h, g.ex.ctx = g.ex.el.getContext("2d"), g.ex.scale_x = g.ex.w / h.world.max_x, g.ex.scale_y = g.ex.h / h.world.max_y, g.ex.scale = Math.min(g.ex.scale_x, g.ex.scale_y), g.ex.offset_x = g.ex.w / 2 - h.world.max_x * g.ex.scale / 2, g.ex.offset_y = g.ex.h / 2 - h.world.max_y * g.ex.scale / 2, g.fx = {}, g.fx.wrap = document.getElementById("fx"), g.fx.w = g.fx.wrap.offsetWidth, g.fx.h = g.fx.wrap.offsetHeight, g.fx.el = document.getElementById("cfx"), g.fx.el.width = g.fx.w, g.fx.el.height = g.fx.h, g.fx.ctx = g.fx.el.getContext("2d"), g.fx.scale_x = g.fx.w / h.world.max_x, g.fx.scale_y = g.fx.h / h.world.max_y, g.fx.scale = Math.min(g.fx.scale_x, g.fx.scale_y), g.fx.offset_x = g.fx.w / 2 - h.world.max_x * g.fx.scale / 2, g.fx.offset_y = g.fx.h / 2 - h.world.max_y * g.fx.scale / 2, g.gx = {}, g.gx.wrap = document.getElementById("gx"), g.gx.w = g.gx.wrap.offsetWidth, g.gx.h = g.gx.wrap.offsetHeight, g.gx.el = document.getElementById("cgx"), g.gx.el.width = g.gx.w, g.gx.el.height = g.gx.h, g.gx.ctx = g.gx.el.getContext("2d"), g.gx.scale_x = g.gx.w / h.world.max_x, g.gx.scale_y = g.gx.h / h.world.max_y, g.gx.scale = Math.min(g.gx.scale_x, g.gx.scale_y), g.gx.offset_x = g.gx.w / 2 - h.world.max_x * g.gx.scale / 2, g.gx.offset_y = g.gx.h / 2 - h.world.max_y * g.gx.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.world = new World({
        max_x: 1024,
        max_y: 1024
    }), this.show_meta = !1, this.raf = null, this.stopped = !1, this.at = 0, this.scanlines = new Scanlines;
    var f = 0,
        m = 0,
        d = 0,
        p = [
            ["011110".split(""), "110001".split(""), "011110".split("")],
            ["011110".split(""), "101001".split(""), "011110".split("")],
            ["011110".split(""), "100101".split(""), "011110".split("")],
            ["011110".split(""), "100011".split(""), "011110".split("")]
        ],
        g = {
            fx: null,
            gx: null
        }, _ = .08,
        _ = .2;
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.delta = function(t, e) {
    function a() {
        f.y = .11 * f.max_y
    }

    function s() {
        a(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(c)
    }

    function i() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        f.at = t, f.prevs.push(f.y), f.prevs.length > f.trails && f.prevs.shift(), f.y = f.y + f.v * e, f.y > f.max_y && (f.y = .1 * f.max_y), f.scanlines.update(e)
    }

    function x() {
        m.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", m.fx.ctx.fillRect(0, 0, f.w, f.h), m.fx.ctx.save(), m.fx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.fx.ctx.scale(m.gx.scale, m.gx.scale), m.gx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(m.gx), m.gx.ctx.save(), m.gx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.gx.ctx.scale(m.gx.scale, m.gx.scale), o(), l(), m.gx.ctx.restore(), m.fx.ctx.restore()
    }

    function o() {
        m.gx.ctx.fillStyle = "#f0f", m.gx.ctx.beginPath(), m.gx.ctx.fillRect(.8 * f.max_x - 64, f.y - 128, 128, 128), m.gx.ctx.fill(), m.fx.ctx.fillStyle = "#0ff", m.fx.ctx.beginPath(), m.fx.ctx.fillRect(.8 * f.max_x - 64, f.y - 128, 128, 128), m.fx.ctx.fill()
    }

    function l() {
        var t = ["var then = Date.now();", "", "function update(){", "  var now = Date.now();", "  var delta = (now - then)/16.77;", "  then = now;", "  y = y + (velocity * delta);", "}"];
        m.gx.ctx.save(), m.gx.ctx.translate(Math.random(), Math.random()), m.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (m.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (m.gx.ctx.fillStyle = "#090"), m.gx.ctx.font = "32pt ubuntu mono";
        for (var e = .1 * f.max_y, a = 0; a < t.length; a++) m.gx.ctx.fillText(t[a], .1 * f.max_x, e + 56 * a);
        m.gx.ctx.fillStyle = "#fff", m.gx.ctx.textAlign = "right", m.gx.ctx.font = "48pt ubuntu mono", m.gx.ctx.fillText(Math.floor(f.y) + " y", .887 * f.max_x, .7 * f.max_y), m.gx.ctx.fillText(f.delta.toFixed(3) + " delta", .968 * f.max_x, .8 * f.max_y), m.gx.ctx.fillText(f.at + " then", .947 * f.max_x, .9 * f.max_y), m.gx.ctx.restore()
    }

    function c() {
        i(), x(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / f.max_x, m.fx.scale_y = m.fx.h / f.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - f.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - f.max_y * m.fx.scale / 2, m.gx = {}, m.gx.wrap = document.getElementById("gx"), m.gx.el = document.getElementById("cgx"), m.gx.ctx = m.gx.el.getContext("2d"), m.gx.w = m.gx.wrap.offsetWidth, m.gx.h = m.gx.wrap.offsetHeight, m.gx.el.width = m.gx.w, m.gx.el.height = m.gx.h, m.gx.scale_x = m.gx.w / f.max_x, m.gx.scale_y = m.gx.h / f.max_y, m.gx.scale = Math.min(m.gx.scale_x, m.gx.scale_y), m.gx.offset_x = m.gx.w / 2 - f.max_x * m.gx.scale / 2, m.gx.offset_y = m.gx.h / 2 - f.max_y * m.gx.scale / 2, s()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.y = .5 * this.max_y, this.v = 4, this.prevs = [], this.trails = 15;
    var m = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.detection = function(t, e) {
    function a() {
        h.obj1 = new Vec3(h.max_x, .1 * h.max_y), h.obj2 = new Vec3(0 * h.max_x, .9 * h.max_y)
    }

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.laser = !1, h.scanlines.update(e), h.obj1.x = h.obj1.x + h.velo * e, h.obj1.x > h.max_x && (h.obj1.x = h.max_x * Math.random()), h.obj1.x < 0 && (h.obj1.x = h.max_x * Math.random()), h.obj1.y = h.obj1.y + h.velo * e, h.obj1.y > h.max_y && (h.obj1.y = h.max_y * Math.random()), h.obj1.y < 0 && (h.obj1.y = h.max_y * Math.random()), h.obj2.x = h.obj2.x - h.velo * e, h.obj2.x < 0 && (h.obj2.x = h.max_x * Math.random()), h.obj2.x > h.max_x && (h.obj2.x = h.max_x * Math.random()), h.obj2.y = h.obj2.y - h.velo * e, h.obj2.y < 0 && (h.obj2.y = h.max_y * Math.random()), h.obj2.y > h.max_y && (h.obj2.y = h.max_y * Math.random()), h.range = h.obj1.rangeXY(h.obj2), h.range < 350 && (h.laser = !0)
    }

    function x() {
        f.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", h.laser && Math.random() < .25 && (f.fx.ctx.fillStyle = "rgba(255, 255, 255, 1)"), f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.save(), f.fx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.fx.ctx.scale(f.gx.scale, f.gx.scale), f.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.gx), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.scale(f.gx.scale, f.gx.scale), o(), h.laser && (f.fx.ctx.beginPath(), f.fx.ctx.lineWidth = 4, f.fx.ctx.strokeStyle = m[Math.floor(Math.random() * m.length)], f.fx.ctx.moveTo(h.obj1.x, h.obj1.y), f.fx.ctx.lineTo(h.obj2.x, h.obj2.y), f.fx.ctx.stroke()), f.fx.ctx.fillStyle = "#fc0", f.fx.ctx.beginPath(), f.fx.ctx.arc(h.obj1.x, h.obj1.y, 16, 0, 2 * Math.PI), f.fx.ctx.fill(), f.fx.ctx.fillStyle = "#0cc", f.fx.ctx.beginPath(), f.fx.ctx.arc(h.obj2.x, h.obj2.y, 16, 0, 2 * Math.PI), f.fx.ctx.fill(), f.gx.ctx.restore(), f.fx.ctx.restore()
    }

    function o() {
        var t = ["var range = this.pos.range(other.pos);", "", "if(range < this.attack_range){", "  this.shoot(other);", "}"];
        f.fx.ctx.fillStyle = "#0f0", Math.random() < .05 && (f.fx.ctx.fillStyle = "#090"), Math.random() < .01 && (f.fx.ctx.fillStyle = "#060"), f.fx.ctx.font = "32pt ubuntu mono";
        for (var e = .05 * h.max_y, a = 0; a < t.length; a++) f.fx.ctx.save(), Math.random() < .0025 && f.fx.ctx.rotate(2 * Math.PI * Math.random()), f.fx.ctx.translate(1 * Math.random(), 1 * Math.random()), f.fx.ctx.fillText(t[a], .1 * h.max_x, e + 48 * a), f.fx.ctx.restore()
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2, f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.el = document.getElementById("cgx"), f.gx.ctx = f.gx.el.getContext("2d"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.scale_x = f.gx.w / h.max_x, f.gx.scale_y = f.gx.h / h.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.max_y * f.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, h.velo = 10;
    var f = {
        fx: null,
        gx: null
    };
    this.scanlines = new Scanlines;
    var m = ["#fff", "#000", "#f0f", "#ff0", "#f00", "0ff"];
    return window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.escalation = function(t, e) {
    function a() {}

    function s() {
        r.fx.ctx.clearRect(0, 0, n.w, n.h)
    }

    function i() {
        a(), s(), n.stopped || (n.raf = window.requestAnimationFrame(i))
    }

    function x() {}

    function o() {
        x(), n.stopped = !1, n.at = Date.now(), n.raf = window.requestAnimationFrame(i)
    }

    function l() {
        n.el.innerHTML = "", n.el.innerHTML = '<canvas id="fx"></canvas><h2>Escalation</h2>', n.w = n.el.offsetWidth, n.h = n.el.offsetHeight, r.fx = {}, r.fx.el = document.getElementById("fx"), r.fx.w = n.w, r.fx.h = n.h, r.fx.ctx = r.fx.el.getContext("2d"), r.fx.el.width = n.w, r.fx.el.height = n.h, o()
    }

    function c() {
        n.stopped = !0
    }
    var n = this;
    this.el = t, this.raf = null, this.stopped = !1, this.at = 0;
    var r = {
        fx: null
    };
    return {
        start: l,
        stop: c
    }
}, Scenes.evileye = function(t, e) {
    function a() {
        h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function s() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        d += (t - h.at) / 75, h.at = t, g += _, g >= 18 && (g = 0, p++, p >= m.length && (p = 0, _ = 2 * _, _ > 1 && (_ = 1), u = 1 + Math.floor(Math.random() * (w - 6)), y = Math.floor(Math.random() * (w - 3)), d = 0)), h.scanlines.update(e)
    }

    function i() {
        f.ex.ctx.fillStyle = "rgba(0, 0, 0, 0.05)", f.ex.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.fx), f.ex.ctx.save(), f.ex.ctx.translate(f.ex.offset_x, f.ex.offset_y), f.ex.ctx.translate(Math.random(), Math.random()), f.ex.ctx.scale(f.ex.scale, f.ex.scale), f.fx.ctx.save(), f.fx.ctx.translate(f.fx.offset_x, f.fx.offset_y), f.fx.ctx.translate(Math.random(), Math.random()), f.fx.ctx.scale(f.fx.scale, f.fx.scale), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.translate(Math.random(), Math.random()), f.gx.ctx.scale(f.gx.scale, f.gx.scale), x(f.fx), o(f.ex), f.ex.ctx.restore(), f.fx.ctx.restore(), f.gx.ctx.restore()
    }

    function x(t) {
        var e, a, s = .8 * h.world.max;
        t.ctx.save(), t.ctx.translate(h.world.max_x / 2 - s / 2, h.world.max_y / 2 - s / 2);
        var i = s / w,
            x = w,
            o = x;
        for (5 > d && (x = d * w / 5), t.ctx.strokeStyle = "rgba(0, 255, 255, 1)", t.ctx.lineWidth = 2, e = 0; x >= e; e++)
            for (a = 0; x >= a; a++) t.ctx.beginPath(), t.ctx.moveTo(0, Math.floor(x / 2 - e / 2) * i + Math.floor(o / 2) * i), t.ctx.lineTo(a * i, Math.floor(o / 2) * i + Math.floor(x / 2 - e / 2) * i), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.moveTo(0, Math.floor(o / 2) * i - Math.floor(x / 2 - e / 2) * i), t.ctx.lineTo(a * i, Math.floor(o / 2) * i - Math.floor(x / 2 - e / 2) * i), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.moveTo(Math.floor(o / 2) * i - Math.floor(x / 2 - a / 2) * i, 0), t.ctx.lineTo(Math.floor(o / 2) * i - Math.floor(x / 2 - a / 2) * i, e * i), t.ctx.stroke(), t.ctx.beginPath(), t.ctx.moveTo(Math.floor(o / 2) * i + Math.floor(x / 2 - a / 2) * i, 0), t.ctx.lineTo(Math.floor(o / 2) * i + Math.floor(x / 2 - a / 2) * i, e * i), t.ctx.stroke();
        t.ctx.restore()
    }

    function o(t) {
        var e, e, a, s = (Date.now(), m[p]);
        t.ctx.save(), t.ctx.translate(.1 * h.world.max, .1 * h.world.max);
        var i = .8 * h.world.max,
            x = 16,
            o = i / x,
            l = Math.floor(o);
        e = Math.floor(g % 6), a = Math.floor(g / 6), t.ctx.save(), t.ctx.translate(u * l, y * l), t.ctx.scale(l, l), t.lineWidth = 0, t.ctx.lineWidth = .05, t.ctx.fillStyle = "rgba(255, 0, 255, 1)", t.ctx.strokeStyle = "rgba(255, 0, 255, 1)", "1" === s[a][e] && (t.ctx.beginPath(), t.ctx.rect(e, a, 1, 1), t.ctx.fill(), t.ctx.stroke()), t.ctx.restore(), t.ctx.restore()
    }

    function l() {
        s(), i(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="ex"><canvas id="cex"></canvas></div><div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.ex = {}, f.ex.wrap = document.getElementById("ex"), f.ex.w = f.ex.wrap.offsetWidth, f.ex.h = f.ex.wrap.offsetHeight, f.ex.el = document.getElementById("cex"), f.ex.el.width = f.ex.w, f.ex.el.height = f.ex.h, f.ex.ctx = f.ex.el.getContext("2d"), f.ex.scale_x = f.ex.w / h.world.max_x, f.ex.scale_y = f.ex.h / h.world.max_y, f.ex.scale = Math.min(f.ex.scale_x, f.ex.scale_y), f.ex.offset_x = f.ex.w / 2 - h.world.max_x * f.ex.scale / 2, f.ex.offset_y = f.ex.h / 2 - h.world.max_y * f.ex.scale / 2, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el = document.getElementById("cfx"), f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.ctx = f.fx.el.getContext("2d"), f.fx.scale_x = f.fx.w / h.world.max_x, f.fx.scale_y = f.fx.h / h.world.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.world.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.world.max_y * f.fx.scale / 2, f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el = document.getElementById("cgx"), f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.ctx = f.gx.el.getContext("2d"), f.gx.scale_x = f.gx.w / h.world.max_x, f.gx.scale_y = f.gx.h / h.world.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.world.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.world.max_y * f.gx.scale / 2, a()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.world = new World({
        max_x: 800,
        max_y: 800
    });
    var f = {
        ex: null,
        fx: null,
        gx: null
    }, m = [
            ["011110".split(""), "110001".split(""), "011110".split("")],
            ["011110".split(""), "101001".split(""), "011110".split("")],
            ["011110".split(""), "100101".split(""), "011110".split("")],
            ["011110".split(""), "100011".split(""), "011110".split("")]
        ],
        d = 0,
        p = 0,
        g = 0,
        _ = 1,
        w = 16,
        u = 7,
        y = 11;
    return u = Math.floor(w / 2 - 3), y = Math.floor(w / 2 - 2), this.scanlines = new Scanlines, window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.flocking = function(t, e) {
    function a() {
        var t, e, a = Date.now(),
            s = Date.now(),
            i = h.delta = (s - h.at) / 16.77;
        for (h.at = s, h.world.update(), t = 0, e = h.boids.length; e > t; t++) h.boids[t].update(i), h.boids[t].dead && (h.boids.splice(t, 1), t--, e--);
        m.update = Date.now() - a
    }

    function s() {
        var t, e, a = Date.now();
        for (f.fx.ctx.save(), f.fx.ctx.clearRect(0, 0, f.fx.w, f.fx.h), f.fx.ctx.translate(f.fx.offset_x, f.fx.offset_y), f.fx.ctx.scale(f.fx.scale, f.fx.scale), t = 0, e = h.boids.length; e > t; t++) h.boids[t].paint(f.fx);
        m.paint = Date.now() - a, m.total = m.update + m.paint, f.fx.ctx.restore(), h.show_meta && (f.fx.ctx.font = "16pt monospace", f.fx.ctx.textBaseline = "middle", f.fx.ctx.textAlign = "right", f.fx.ctx.fillStyle = "#999", m.update > 16 && (f.fx.ctx.fillStyle = "#f00"), f.fx.ctx.fillText(m.update + " update", h.w - 32, 32), f.fx.ctx.fillStyle = "#999", m.paint > 16 && (f.fx.ctx.fillStyle = "#f00"), f.fx.ctx.fillText(m.paint + " paint ", h.w - 32, 56), f.fx.ctx.fillStyle = "#999", m.total > 16 && (f.fx.ctx.fillStyle = "#f00"), f.fx.ctx.fillText(m.total + " total ", h.w - 32, 80))
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {
        for (; h.boids.length < h.boids_max;) h.boids.push(new Boid({
            world: h.world,
            boids: h.boids
        }))
    }

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        h.el.innerHTML = "", h.el.innerHTML = '<div id="fx"><canvas id="cfx"></canvas></div>', h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el = document.getElementById("cfx"), f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.ctx = f.fx.el.getContext("2d"), f.fx.scale_x = f.fx.w / h.world.max_x, f.fx.scale_y = f.fx.h / h.world.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.world.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.world.max_y * f.fx.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.world = new World({
        max_x: 800,
        max_y: 800
    }), this.show_meta = !1, this.boids_max = e.boids_max || 150, this.raf = null, this.stopped = !1, this.at = 0;
    var f = {
        fx: null
    }, m = {
            update: null,
            paint: null
        };
    return this.boids = [], window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.framerates = function(t, e) {
    function a() {}

    function s() {
        r.fx.ctx.clearRect(0, 0, n.w, n.h)
    }

    function i() {
        a(), s(), n.stopped || (n.raf = window.requestAnimationFrame(i))
    }

    function x() {}

    function o() {
        x(), n.stopped = !1, n.at = Date.now(), n.raf = window.requestAnimationFrame(i)
    }

    function l() {
        n.el.innerHTML = "", n.el.innerHTML = '<canvas id="fx"></canvas><h2>Framerates</h2>', n.w = n.el.offsetWidth, n.h = n.el.offsetHeight, r.fx = {}, r.fx.el = document.getElementById("fx"), r.fx.w = n.w, r.fx.h = n.h, r.fx.ctx = r.fx.el.getContext("2d"), r.fx.el.width = n.w, r.fx.el.height = n.h, o()
    }

    function c() {
        n.stopped = !0
    }
    var n = this;
    this.el = t, this.raf = null, this.stopped = !1, this.at = 0;
    var r = {
        fx: null
    };
    return {
        start: l,
        stop: c
    }
}, Scenes.gameloop = function(t, e) {
    function a() {
        f.y = .11 * f.max_y
    }

    function s() {
        a(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(c)
    }

    function i() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        f.at = t, f.prevs.push(f.y), f.prevs.length > f.trails && f.prevs.shift(), f.y = f.y + f.v * e, f.y > f.max_y && (f.y = .1 * f.max_y), f.scanlines.update(e)
    }

    function x() {
        m.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", m.fx.ctx.fillRect(0, 0, f.w, f.h), m.fx.ctx.save(), m.fx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.fx.ctx.scale(m.gx.scale, m.gx.scale), m.gx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(m.gx), m.gx.ctx.save(), m.gx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.gx.ctx.scale(m.gx.scale, m.gx.scale), o(), l(), m.gx.ctx.restore(), m.fx.ctx.restore()
    }

    function o() {
        m.gx.ctx.fillStyle = "#f0f", m.gx.ctx.beginPath(), m.gx.ctx.fillRect(.5 * f.max_x - 64, f.y - 128, 128, 128), m.gx.ctx.fill(), m.fx.ctx.fillStyle = "#0ff", m.fx.ctx.beginPath(), m.fx.ctx.fillRect(.5 * f.max_x - 64, f.y - 128, 128, 128), m.fx.ctx.fill()
    }

    function l() {
        var t = ["while(!gameover){", "  update();", "  paint();", "}"];
        m.gx.ctx.save(), m.gx.ctx.translate(Math.random(), Math.random()), m.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (m.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (m.gx.ctx.fillStyle = "#090"), m.gx.ctx.font = "32pt ubuntu mono";
        for (var e = .1 * f.max_y, a = 0; a < t.length; a++) m.gx.ctx.fillText(t[a], .1 * f.max_x, e + 56 * a);
        m.gx.ctx.restore()
    }

    function c() {
        i(), x(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / f.max_x, m.fx.scale_y = m.fx.h / f.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - f.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - f.max_y * m.fx.scale / 2, m.gx = {}, m.gx.wrap = document.getElementById("gx"), m.gx.el = document.getElementById("cgx"), m.gx.ctx = m.gx.el.getContext("2d"), m.gx.w = m.gx.wrap.offsetWidth, m.gx.h = m.gx.wrap.offsetHeight, m.gx.el.width = m.gx.w, m.gx.el.height = m.gx.h, m.gx.scale_x = m.gx.w / f.max_x, m.gx.scale_y = m.gx.h / f.max_y, m.gx.scale = Math.min(m.gx.scale_x, m.gx.scale_y), m.gx.offset_x = m.gx.w / 2 - f.max_x * m.gx.scale / 2, m.gx.offset_y = m.gx.h / 2 - f.max_y * m.gx.scale / 2, s()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.y = .5 * this.max_y, this.v = 4, this.prevs = [], this.trails = 15;
    var m = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.gameloop_methods = function(t, e) {
    function a() {
        f.y = .11 * f.max_y
    }

    function s() {
        a(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(c)
    }

    function i() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        f.at = t, f.prevs.push(f.y), f.prevs.length > f.trails && f.prevs.shift(), f.y = f.y + f.v * e, f.y > f.max_y && (f.y = .1 * f.max_y), f.scanlines.update(e)
    }

    function x() {
        m.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", m.fx.ctx.fillRect(0, 0, f.w, f.h), m.fx.ctx.save(), m.fx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.fx.ctx.scale(m.gx.scale, m.gx.scale), m.gx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(m.gx), m.gx.ctx.save(), m.gx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.gx.ctx.scale(m.gx.scale, m.gx.scale), o(), l(), m.gx.ctx.restore(), m.fx.ctx.restore()
    }

    function o() {
        m.gx.ctx.fillStyle = "#f0f", m.gx.ctx.beginPath(), m.gx.ctx.fillRect(.7 * f.max_x - 64, f.y - 128, 128, 128), m.gx.ctx.fill(), m.fx.ctx.fillStyle = "#0ff", m.fx.ctx.beginPath(), m.fx.ctx.fillRect(.7 * f.max_x - 64, f.y - 128, 128, 128), m.fx.ctx.fill()
    }

    function l() {
        var t = ["function update(){", "  y = y + velocity;", "  if(y >= max){", "    y = 0;", "  }", "}", "", "function paint(){", "  clearScreen();", "  paintObjects();", "}"];
        m.gx.ctx.save(), m.gx.ctx.translate(Math.random(), Math.random()), m.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (m.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (m.gx.ctx.fillStyle = "#090"), m.gx.ctx.font = "32pt ubuntu mono";
        for (var e = .1 * f.max_y, a = 0; a < t.length; a++) m.gx.ctx.fillText(t[a], .1 * f.max_x, e + 56 * a);
        m.gx.ctx.fillStyle = "#fff", m.gx.ctx.textAlign = "right", m.gx.ctx.font = "48pt ubuntu mono", m.gx.ctx.fillText(Math.floor(f.y) + " y", .9 * f.max_x, 56), m.gx.ctx.restore()
    }

    function c() {
        i(), x(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / f.max_x, m.fx.scale_y = m.fx.h / f.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - f.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - f.max_y * m.fx.scale / 2, m.gx = {}, m.gx.wrap = document.getElementById("gx"), m.gx.el = document.getElementById("cgx"), m.gx.ctx = m.gx.el.getContext("2d"), m.gx.w = m.gx.wrap.offsetWidth, m.gx.h = m.gx.wrap.offsetHeight, m.gx.el.width = m.gx.w, m.gx.el.height = m.gx.h, m.gx.scale_x = m.gx.w / f.max_x, m.gx.scale_y = m.gx.h / f.max_y, m.gx.scale = Math.min(m.gx.scale_x, m.gx.scale_y), m.gx.offset_x = m.gx.w / 2 - f.max_x * m.gx.scale / 2, m.gx.offset_y = m.gx.h / 2 - f.max_y * m.gx.scale / 2, s()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.y = .5 * this.max_y, this.v = 4, this.prevs = [], this.trails = 15;
    var m = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.interception = function(t, e) {
    function a() {
        var t, e, a = Date.now(),
            s = Date.now(),
            i = h.delta = (s - h.at) / 16.77;
        h.at = s;
        var o = 0;
        for (h.flash > 0 && h.flash--; h.bombs.length < h.bomb_max && o < h.bombs_per_tick;) o++, h.bombs.push(new Bomb({
            x: .125 * h.max_x + h.max_x * Math.random() * .75,
            y: 0,
            world: h,
            target: pickOne(h.silos),
            booms: h.booms
        }));
        for (t = 0, e = h.bombs.length; e > t; t++) h.bombs[t].update(i), h.bombs[t].dead && (h.bombs.splice(t, 1), t--, e--);
        for (t = 0, e = h.interceptors.length; e > t; t++) h.interceptors[t].update(i), h.interceptors[t].dead && (h.interceptors.splice(t, 1), t--, e--);
        for (t = 0, e = h.silos.length; e > t; t++) h.silos[t].update(i), h.silos[t].dead && (h.silos.splice(t, 1), t--, e--);
        for (t = 0, e = h.booms.length; e > t; t++) h.booms[t].update(i), h.booms[t].dead && (h.booms.splice(t, 1), t--, e--);
        0 !== h.silos.length || h.gameover || (h.gameover = !0, setTimeout(x, 2500, h)), m.update = Date.now() - a
    }

    function s() {
        var t = Date.now();
        f.fx.ctx.save(), f.fx.ctx.clearRect(0, 0, f.fx.w, f.fx.h), h.flash > 0 && (f.fx.ctx.fillStyle = "#fff", f.fx.ctx.fillRect(0, 0, f.fx.w, f.fx.h)), f.fx.ctx.translate(f.fx.offset_x, f.fx.offset_y), f.fx.ctx.scale(f.fx.scale, f.fx.scale);
        var e, a, s;
        for (e = 0, a = h.bombs.length; a > e; e++) h.bombs[e].paint(f.fx);
        for (e = 0, a = h.interceptors.length; a > e; e++) h.interceptors[e].paint(f.fx);
        for (e = 0, a = h.booms.length; a > e; e++) h.booms[e].paint(f.fx);
        for (e = 0, a = h.silos.length; a > e; e++) h.silos[e].paint(f.fx);
        if (f.fx.ctx.restore(), m.paint = Date.now() - t, m.total = m.update + m.paint, h.gameover && Date.now() / 1e3 % 1 > .5 && (f.fx.ctx.fillStyle = "#f00", f.fx.ctx.font = "32pt ubuntu mono", f.fx.ctx.textBaseline = "middle", f.fx.ctx.textAlign = "center", f.fx.ctx.fillText("GAME OVER", h.w / 2, h.h / 2)), h.show_meta) {
            s = h.w - 32, f.fx.ctx.font = "24pt ubuntu mono", f.fx.ctx.textBaseline = "middle", f.fx.ctx.textAlign = "right", f.fx.ctx.fillStyle = "#999", m.update > 12 && (f.fx.ctx.fillStyle = "#f00"), f.fx.ctx.fillText(m.update + "ms update  ", s, 32), f.fx.ctx.fillStyle = "#999", m.paint > 12 && (f.fx.ctx.fillStyle = "#f00"), f.fx.ctx.fillText(m.paint + "ms paint   ", s, 64), f.fx.ctx.fillStyle = "#999", m.total > 12 && (f.fx.ctx.fillStyle = "#f00"), f.fx.ctx.fillText(m.total + "ms total   ", s, 96), f.fx.ctx.font = "24pt ubuntu mono", f.fx.ctx.textBaseline = "middle", f.fx.ctx.textAlign = "right", f.fx.ctx.fillStyle = "#999", f.fx.ctx.fillText(h.bombs.length + " icbms   ", s, 168), f.fx.ctx.fillText(h.interceptors.length + " abms    ", s, 200), f.fx.ctx.fillText(h.booms.length + " booms   ", s, 232);
            var i = h.bombs.length + h.interceptors.length + h.booms.length;
            f.fx.ctx.fillText(i + " total   ", s, 264)
        }
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {
        for (var t, a = h.max_x / (h.silos_max + 1), s = 0; s < h.silos_max; s++) t = a + a * s, h.silos.push(new Silo({
            x: t,
            y: .9 * h.max_y,
            booms: h.booms,
            bombs: h.bombs,
            interceptors: h.interceptors,
            launch_max: h.launch_max,
            launch_per_tick: h.launch_per_tick,
            stock: e.stock,
            color: "#fff"
        }));
        h.gameover = !1
    }

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.silos_max = e.silos_max || 3, this.launch_max = e.launch_max || 10, this.launch_per_tick = e.launch_per_tick || 5, this.stock = e.stock || 1e3, this.bomb_max = e.bomb_max || 5, this.bombs_per_tick = e.bombs_per_tick || 1, this.max_x = 1600, this.max_y = 900, this.gameover = !1, this.raf = null, this.stopped = !1, this.flash = 0;
    var f = {
        fx: null
    };
    this.silos = [], this.bombs = [], this.interceptors = [], this.booms = [], this.show_meta = !1;
    var m = {
        update: null,
        paint: null
    };
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.loading = function(t, e) {
    function a() {
        f.stopped = !1, f.at = Date.now(), d = 0, m = _[d], f.raf = window.requestAnimationFrame(c)
    }

    function s() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        g += (t - f.at) / 1e3, f.at = t, g > m.duration && (d++, d < _.length && (m = _[d], g = 0)), f.scanlines.update(e)
    }

    function i() {
        p.fx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(p.fx), p.fx.ctx.save(), p.fx.ctx.translate(p.fx.offset_x, p.fx.offset_y), p.fx.ctx.translate(Math.random(), Math.random()), p.fx.ctx.scale(p.fx.scale, p.fx.scale), m.paint && m.paint(), p.fx.ctx.restore()
    }

    function x() {
        p.fx.ctx.fillStyle = "#0f0", Math.random() < .05 && (p.fx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (p.fx.ctx.fillStyle = "#090"), p.fx.ctx.font = "28pt ubuntu mono", p.fx.ctx.fillText("READY?", .2 * f.max_x, .1 * f.max_y)
    }

    function o() {
        var t = String.fromCharCode(171),
            e = ["READY.             ", "> SYSTEM" + t, "*? PKTM" + t, "*? /" + t, "*** PSURKITERM 8.24", "ATDT 00116421859394" + t, "DIAL ..............", "CNCT               ", "USER PSI6030" + t, "PASS ........|....." + t, "GREETINGS, SIMON"],
            a = Math.floor(g / 4);
        a >= e.length && (a = e.length);
        var s, i = Math.ceil(40 * (g / 4 - Math.floor(g / 4)));
        p.fx.ctx.font = "28pt ubuntu mono";
        for (var x = .9 * f.max_y - 40 * a, o = 0; a > o; o++) s = e[o].substr(i, 1), p.fx.ctx.fillStyle = "#0f0", Math.random() < .05 && (p.fx.ctx.fillStyle = "#0c0"), Math.random() < .1 && (p.fx.ctx.fillStyle = "#090"), o === a - 1 ? (s === t && (p.fx.ctx.fillStyle = "#fff"), p.fx.ctx.fillText(e[o].substr(0, i), .2 * f.max_x, x + 40 * o), i < e[a - 1].length && (p.fx.ctx.fillStyle = "#0f0", p.fx.ctx.fillRect(.2 * f.max_x + 20 * i - 32, .9 * f.max_y - 32, 32, 8))) : p.fx.ctx.fillText(e[o], .2 * f.max_x, x + 40 * o)
    }

    function l() {
        var t = ["+--------------------------------------+", "|                COLDWAR               |", "+--------------------------------------+", "|                     /                |", "|     o              /  A)SSETS        |", "|             o     /   T)ARGETS       |", "|                  /    M)UNITIONS    /|", "|   o             /     C)ITIZENS    / |", "|             .  /      L)AUNCH     /  |", "|           .* ./.*                /   |", "|--          .****.               / ---|", "|  --^---    * ** *   ---^--^----      |", "+--------------------------------------+", "                                        "],
            e = Math.floor(g / 4);
        e >= t.length && (e = t.length);
        var a = Math.ceil(40 * (g / 4 - Math.floor(g / 4)));
        p.fx.ctx.font = "28pt ubuntu mono";
        for (var s = .9 * f.max_y - 40 * e, i = 0; e > i; i++) i === e - 1 ? (p.fx.ctx.fillStyle = "#ffbf00", Math.random() < .1 && (p.fx.ctx.fillStyle = "#ffdd33"), p.fx.ctx.fillText(t[i].substr(0, a), .2 * f.max_x, s + 40 * i), a < t[e - 1].length && (p.fx.ctx.fillStyle = "#ffdd33", p.fx.ctx.fillRect(.2 * f.max_x + 18 * a, .9 * f.max_y - 32, 32, 8))) : (p.fx.ctx.fillStyle = "#ffbf00", Math.random() < .1 && (p.fx.ctx.fillStyle = "#ffdd33"), p.fx.ctx.fillText(t[i], .2 * f.max_x, s + 40 * i))
    }

    function c() {
        s(), i(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, p.fx = {}, p.fx.wrap = document.getElementById("fx"), p.fx.el = document.getElementById("cfx"), p.fx.ctx = p.fx.el.getContext("2d"), p.fx.w = p.fx.wrap.offsetWidth, p.fx.h = p.fx.wrap.offsetHeight, p.fx.el.width = p.fx.w, p.fx.el.height = p.fx.h, p.fx.scale_x = p.fx.w / f.max_x, p.fx.scale_y = p.fx.h / f.max_y, p.fx.scale = Math.min(p.fx.scale_x, p.fx.scale_y), p.fx.offset_x = p.fx.w / 2 - f.max_x * p.fx.scale / 2, p.fx.offset_y = p.fx.h / 2 - f.max_y * p.fx.scale / 2, a()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700;
    var m, d, p = {
            fx: null
        }, g = 0,
        _ = [{
            duration: 2,
            paint: x
        }, {
            duration: 48,
            paint: o
        }, {
            duration: 70,
            paint: l
        }];
    return this.scanlines = new Scanlines, window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.munitions = function(t, e) {
    function a() {}

    function s() {
        r.fx.ctx.clearRect(0, 0, n.w, n.h)
    }

    function i() {
        a(), s(), n.stopped || (n.raf = window.requestAnimationFrame(i))
    }

    function x() {}

    function o() {
        x(), n.stopped = !1, n.at = Date.now(), n.raf = window.requestAnimationFrame(i)
    }

    function l() {
        n.el.innerHTML = "", n.el.innerHTML = '<canvas id="fx"></canvas><h2>Munitions</h2>', n.w = n.el.offsetWidth, n.h = n.el.offsetHeight, r.fx = {}, r.fx.el = document.getElementById("fx"), r.fx.w = n.w, r.fx.h = n.h, r.fx.ctx = r.fx.el.getContext("2d"), r.fx.el.width = n.w, r.fx.el.height = n.h, o()
    }

    function c() {
        n.stopped = !0
    }
    var n = this;
    this.el = t, this.raf = null, this.stopped = !1, this.at = 0;
    var r = {
        fx: null
    };
    return {
        start: l,
        stop: c
    }
}, Scenes.predators = function(t, e) {
    function a() {
        var t, e, a = Date.now(),
            x = Date.now(),
            o = p.delta = (x - p.at) / 16.77;
        p.at = x, p.world.update();
        var l = 0,
            c = 0,
            n = 0;
        for (t = 0, e = p.boids.length; e > t; t++) l += p.boids[t].x, c += p.boids[t].y, n++;
        for (l /= n, c /= n, t = 0, e = p.boids.length; e > t; t++) s(p.boids[t], o, l, c);
        for (t = 0, e = p.predators.length; e > t; t++) i(p.predators[t], o, l, c);
        _.update = Date.now() - a
    }

    function s(t, e, a, s) {
        var i, x, o, l, c, n, r, h, f, m, d = p.world.max_x / 16;
        p.world.max_y / 16;
        for (m = t.a, c = t.v * Math.cos(m), n = t.v * Math.sin(m), i = 0, x = 0, o = 0, l = p.boids.length; l > o; o++) h = p.boids[o], h !== t && (f = u.distance(h.x, h.y, t.x, t.y), 0 !== f && 2 * d > f && (m = u.angle(h.x, h.y, t.x, t.y), i -= Math.cos(m) * (1 / f), x -= Math.sin(m) * (1 / f)));
        for (c += t.v * i * .7, n += t.v * x * .7, i = 0, x = 0, r = 0, o = 0, l = p.boids.length; l > o; o++) h = p.boids[o], h !== t && (i += .1 * Math.cos(h.a), x += .1 * Math.sin(h.a), r++);
        for (r > 0 && (c += t.v * (i / r), n += t.v * (x / r)), m = u.angle(a, s, t.x, t.y), c += t.v * Math.cos(m) * .05, n += t.v * Math.sin(m) * .05, i = 0, x = 0, j = 0, jj = p.predators.length; j < jj; j++) predator = p.predators[j], f = u.distance(predator.x, predator.y, t.x, t.y), f > 0 && 4 * d > f && (m = u.angle(predator.x, predator.y, t.x, t.y), i -= Math.cos(m) * (1 / f), x -= Math.sin(m) * (1 / f));
        c += t.v * i * 15, n += t.v * x * 15, t.x += c, t.y += n, t.a = Math.atan2(n, c), t.x < 0 && (t.x = p.world.max_x), t.x > p.world.max_x && (t.x = 0), t.y < 0 && (t.y = p.world.max_y), t.y > p.world.max_y && (t.y = 0)
    }

    function i(t, e, a, s) {
        var i, x, o;
        p.world.max_x / 16, p.world.max_y / 16;
        o = t.a, i = t.v * Math.cos(o), x = t.v * Math.sin(o), o = u.angle(a, s, t.x, t.y), i += t.v * Math.cos(o) * .05, x += t.v * Math.sin(o) * .05, t.x += i, t.y += x, t.a = Math.atan2(x, i), t.x < 0 && (t.x = p.world.max_x), t.x > p.world.max_x && (t.x = 0), t.y < 0 && (t.y = p.world.max_y), t.y > p.world.max_y && (t.y = 0)
    }

    function x() {
        var t, e, a = Date.now(),
            s = 8;
        for (g.fx.ctx.save(), g.fx.ctx.clearRect(0, 0, g.fx.w, g.fx.h), g.fx.ctx.translate(g.fx.offset_x, g.fx.offset_y), g.fx.ctx.scale(g.fx.scale, g.fx.scale), t = 0, e = p.boids.length; e > t; t++) {
            var i = p.boids[t];
            g.fx.ctx.save(), g.fx.ctx.translate(i.x, i.y), g.fx.ctx.rotate(i.a), g.fx.ctx.fillStyle = "#fff", g.fx.ctx.lineWidth = 1, g.fx.ctx.beginPath(), g.fx.ctx.moveTo(s, 0), g.fx.ctx.lineTo(-s, -s), g.fx.ctx.lineTo(-s / 2, 0), g.fx.ctx.lineTo(-s, s), g.fx.ctx.lineTo(s, 0), g.fx.ctx.closePath(), g.fx.ctx.fill(), g.fx.ctx.restore()
        }
        for (t = 0, e = p.predators.length; e > t; t++) {
            var x = p.predators[t];
            g.fx.ctx.save(), g.fx.ctx.translate(x.x, x.y), g.fx.ctx.rotate(x.a), s = 16, g.fx.ctx.fillStyle = "#f00", g.fx.ctx.lineWidth = 1, g.fx.ctx.beginPath(), g.fx.ctx.moveTo(s, 0), g.fx.ctx.lineTo(-s, -s), g.fx.ctx.lineTo(-s / 2, 0), g.fx.ctx.lineTo(-s, s), g.fx.ctx.lineTo(s, 0), g.fx.ctx.closePath(), g.fx.ctx.fill(), g.fx.ctx.restore()
        }
        _.paint = Date.now() - a, _.total = _.update + _.paint, g.fx.ctx.restore(), p.show_meta && (g.fx.ctx.font = "16pt monospace", g.fx.ctx.textBaseline = "middle", g.fx.ctx.textAlign = "right", g.fx.ctx.fillStyle = "#999", _.update > 16 && (g.fx.ctx.fillStyle = "#f00"), g.fx.ctx.fillText(_.update + " update", p.w - 32, 32), g.fx.ctx.fillStyle = "#999", _.paint > 16 && (g.fx.ctx.fillStyle = "#f00"), g.fx.ctx.fillText(_.paint + " paint ", p.w - 32, 56), g.fx.ctx.fillStyle = "#999", _.total > 16 && (g.fx.ctx.fillStyle = "#f00"), g.fx.ctx.fillText(_.total + " total ", p.w - 32, 80))
    }

    function o() {
        a(), x(), p.stopped || (p.raf = window.requestAnimationFrame(o))
    }

    function l(t) {
        var e = {
            x: p.world.max_x / 2,
            y: p.world.max_y / 2,
            a: 2 * Math.random() * Math.PI,
            v: (5 + 10 * Math.random()) / 2
        };
        return e
    }

    function c(t) {
        var e = {
            x: p.world.max_x * Math.random(),
            y: p.world.max_y * Math.random(),
            a: 2 * Math.random() * Math.PI,
            v: (5 + 10 * Math.random()) / 2
        };
        return e
    }

    function n() {
        for (; p.boids.length < p.boids_max;) p.boids.push(l());
        for (; p.predators.length < p.predators_max;) p.predators.push(c());
        w = document.createElement("canvas"), w.width = 16, w.height = 16;
        var t = w.getContext("2d");
        t.fillStyle = "#fff", t.lineWidth = 2, t.beginPath(), t.moveTo(16, 8), t.lineTo(0, 0), t.lineTo(4, 8), t.lineTo(0, 16), t.lineTo(16, 8), t.closePath(), t.fill()
    }

    function r() {
        n(), p.stopped = !1, p.at = Date.now(), p.raf = window.requestAnimationFrame(o)
    }

    function h() {
        p.el.innerHTML = "", p.el.innerHTML = '<div id="fx"><canvas id="cfx"></canvas></div>', p.w = p.el.offsetWidth, p.h = p.el.offsetHeight, g.fx = {}, g.fx.wrap = document.getElementById("fx"), g.fx.w = g.fx.wrap.offsetWidth, g.fx.h = g.fx.wrap.offsetHeight, g.fx.el = document.getElementById("cfx"), g.fx.el.width = g.fx.w, g.fx.el.height = g.fx.h, g.fx.ctx = g.fx.el.getContext("2d"), g.fx.scale_x = g.fx.w / p.world.max_x, g.fx.scale_y = g.fx.h / p.world.max_y, g.fx.scale = Math.min(g.fx.scale_x, g.fx.scale_y), g.fx.offset_x = g.fx.w / 2 - p.world.max_x * g.fx.scale / 2, g.fx.offset_y = g.fx.h / 2 - p.world.max_y * g.fx.scale / 2, r()
    }

    function f() {
        p.stopped = !0
    }

    function m() {
        p.show_meta = !p.show_meta
    }

    function d() {
        p.stopped || (f(), setTimeout(h, 100))
    }
    var p = this;
    this.el = t, this.world = new World({
        max_x: 1600,
        max_y: 900
    }), this.show_meta = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var g = {
        fx: null
    }, _ = {
            update: null,
            paint: null
        };
    this.boids_max = e.boids_max || 50, this.boids = [], this.predators_max = e.predators_max || 2, this.predators = [];
    var w, u = {
            angle: function(t, e, a, s) {
                var i = t - a,
                    x = e - s;
                return Math.atan2(x, i)
            },
            distance: function(t, e, a, s) {
                var i = Math.abs(t - a),
                    x = Math.abs(e - s);
                return Math.sqrt(i * i + x * x)
            }
        };
    return window.onresize = d, {
        start: h,
        stop: f,
        toggleMeta: m
    }
}, Scenes.primitives = function(t, e) {
    function a() {
        h.y = .11 * h.max_y
    }

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.time += e / 100, h.time > 2 && (h.scene = h.scene + 1, h.time = 0, h.scene >= m.length && (h.scene = 0)), h.angle += .03, h.scale += .07, h.scanlines.update(e)
    }

    function x() {
        f.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.save(), f.fx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.fx.ctx.scale(f.gx.scale, f.gx.scale), f.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.gx), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.scale(f.gx.scale, f.gx.scale), o(), f.gx.ctx.restore(), f.fx.ctx.restore()
    }

    function o() {
        f.gx.ctx.save(), f.gx.ctx.translate(Math.random(), Math.random()), f.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (f.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (f.gx.ctx.fillStyle = "#090"), f.gx.ctx.font = "36pt ubuntu mono";
        var t = m[h.scene].code,
            e = (.25 * h.max, Math.sin(h.scale)),
            a = .1 * h.max_y;
        f.gx.ctx.fillText("ctx.rotate(" + (h.angle % (2 * Math.PI)).toFixed(2) + ");", .1 * h.max_x, a), a += 56, f.gx.ctx.fillText("ctx.scale(" + (1.5 + e).toFixed(2) + ", " + (1.5 + e).toFixed(2) + ");", .1 * h.max_x, a), a += 56;
        for (var s = 0; s < t.length; s++) f.gx.ctx.fillText(t[s], .1 * h.max_x, a + 56 * s);
        f.gx.ctx.restore(), f.gx.ctx.save(), f.gx.ctx.translate(.5 * h.max_x, .5 * h.max_y), f.gx.ctx.rotate(h.angle), f.gx.ctx.scale(160, 160), f.gx.ctx.scale(1.5 + e, 1.5 + e), m[h.scene].paint(f.gx.ctx), f.gx.ctx.restore()
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2, f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.el = document.getElementById("cgx"), f.gx.ctx = f.gx.el.getContext("2d"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.scale_x = f.gx.w / h.max_x, f.gx.scale_y = f.gx.h / h.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.max_y * f.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.max = Math.min(this.max_x, this.max_y), this.y = .5 * this.max_y, this.v = 4, this.time = 0, this.scene = 0, this.angle = 1.5 * Math.PI, this.scale = 0;
    var f = {
        fx: null,
        gx: null
    };
    this.scanlines = new Scanlines;
    var m = [{
        paint: function(t) {
            t.lineWidth = .2, t.beginPath(), t.strokeStyle = "#c000ff", t.rect(-1, -1, 2, 2), t.stroke()
        },
        code: ["ctx.rect(x, y, w, h);", "ctx.stroke();"]
    }, {
        paint: function(t) {
            t.beginPath(), t.lineWidth = .4, t.beginPath(), t.strokeStyle = "#c000ff", t.fillStyle = "#c000ff", t.fillRect(-1, -1, 2, 2), t.stroke()
        },
        code: ["ctx.fillRect(x, y, w, h);"]
    }, {
        paint: function(t) {
            t.lineWidth = .2, t.beginPath(), t.strokeStyle = "#c000ff", t.arc(0, 0, 1, h.angle % Math.PI, 1.5 * Math.PI), t.stroke()
        },
        code: ["ctx.arc(x, y, r, start, end);"]
    }, {
        paint: function(t) {
            t.lineWidth = .3, t.lineCap = "round", t.strokeStyle = "#c000ff", t.beginPath(), t.moveTo(-1, -1), t.lineTo(1, 1), t.stroke()
        },
        code: ["ctx.beginPath();", "ctx.moveTo(x1, y1);", "ctx.lineTo(x2, y2);", "ctx.stroke();"]
    }, {
        paint: function(t) {
            t.fillStyle = "#c000ff", t.font = "1px ubuntu mono", t.textAlign = "center", t.textBaseline = "middle", t.fillText("1UP", 0, .25)
        },
        code: ["ctx.font='32pt ubuntu mono';", "ctx.fillText(string, x, y);"]
    }];
    return window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.raf = function(t, e) {
    function a() {
        f.y = .11 * f.max_y
    }

    function s() {
        a(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(c)
    }

    function i() {
        var t = Date.now(),
            e = f.delta = (t - f.at) / 16.77;
        f.at = t, f.prevs.push(f.y), f.prevs.length > f.trails && f.prevs.shift(), f.y = f.y + f.v * e, f.y > f.max_y && (f.y = .1 * f.max_y), f.scanlines.update(e)
    }

    function x() {
        m.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", m.fx.ctx.fillRect(0, 0, f.w, f.h), m.fx.ctx.save(), m.fx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.fx.ctx.scale(m.gx.scale, m.gx.scale), m.gx.ctx.clearRect(0, 0, f.w, f.h), f.scanlines.paint(m.gx), m.gx.ctx.save(), m.gx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.gx.ctx.scale(m.gx.scale, m.gx.scale), o(), l(), m.gx.ctx.restore(), m.fx.ctx.restore()
    }

    function o() {
        m.gx.ctx.fillStyle = "#f0f", m.gx.ctx.beginPath(), m.gx.ctx.fillRect(.6 * f.max_x - 64, f.y - 128, 128, 128), m.gx.ctx.fill(), m.fx.ctx.fillStyle = "#0ff", m.fx.ctx.beginPath(), m.fx.ctx.fillRect(.6 * f.max_x - 64, f.y - 128, 128, 128), m.fx.ctx.fill()
    }

    function l() {
        var t = ["function tick(){", "  update();", "  paint();", "  window.requestAnimationFrame(tick);", "}", "tick();"];
        m.gx.ctx.save(), m.gx.ctx.translate(Math.random(), Math.random()), m.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (m.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (m.gx.ctx.fillStyle = "#090"), m.gx.ctx.font = "32pt ubuntu mono";
        for (var e = .1 * f.max_y, a = 0; a < t.length; a++) m.gx.ctx.fillText(t[a], .1 * f.max_x, e + 56 * a);
        m.gx.ctx.restore()
    }

    function c() {
        i(), x(), f.stopped || (f.raf = window.requestAnimationFrame(c))
    }

    function n() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / f.max_x, m.fx.scale_y = m.fx.h / f.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - f.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - f.max_y * m.fx.scale / 2, m.gx = {}, m.gx.wrap = document.getElementById("gx"), m.gx.el = document.getElementById("cgx"), m.gx.ctx = m.gx.el.getContext("2d"), m.gx.w = m.gx.wrap.offsetWidth, m.gx.h = m.gx.wrap.offsetHeight, m.gx.el.width = m.gx.w, m.gx.el.height = m.gx.h, m.gx.scale_x = m.gx.w / f.max_x, m.gx.scale_y = m.gx.h / f.max_y, m.gx.scale = Math.min(m.gx.scale_x, m.gx.scale_y), m.gx.offset_x = m.gx.w / 2 - f.max_x * m.gx.scale / 2, m.gx.offset_y = m.gx.h / 2 - f.max_y * m.gx.scale / 2, s()
    }

    function r() {
        f.stopped = !0
    }

    function h() {
        f.stopped || (r(), setTimeout(n, 100))
    }
    var f = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.y = .5 * this.max_y, this.v = 4, this.prevs = [], this.trails = 15;
    var m = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = h, {
        start: n,
        stop: r
    }
}, Scenes.raster_graphics = function(t, e) {
    function a() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        f += (t - h.at) / 750, h.at = t, d += _, d >= 18 && (d = 0, m++, m >= p.length && (m = 0, _ = 2 * _, _ > 1 && (_ = 1))), h.scanlines.update(e)
    }

    function s() {
        var t, t, e, a = (Date.now(), 96),
            s = p[m];
        t = Math.floor(d % 6), e = Math.floor(d / 6), g.ex.ctx.fillStyle = "rgba(0, 0, 0, 0.5)", g.ex.ctx.fillRect(0, 0, h.w, h.h), g.ex.ctx.save(), g.ex.ctx.translate(g.ex.offset_x, g.ex.offset_y), g.ex.ctx.scale(g.ex.scale, g.ex.scale), g.ex.ctx.lineWidth = 4, g.ex.ctx.strokeStyle = "#0ff", "1" === s[e][t] && (g.ex.ctx.beginPath(), g.ex.ctx.moveTo(h.world.max_x / 2, .2 * h.world.max_y), g.ex.ctx.lineTo(h.world.max_x / 2 - 3 * a + t * a + a / 2, h.world.max_y / 2 - 1.5 * a + e * a * 1.5 + a / 3), g.ex.ctx.stroke()), g.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.03)", g.fx.ctx.fillRect(0, 0, h.w, h.h), g.fx.ctx.save(), g.fx.ctx.translate(g.fx.offset_x, g.fx.offset_y), g.fx.ctx.scale(g.fx.scale, g.fx.scale), g.gx.ctx.save(), g.gx.ctx.clearRect(0, 0, g.gx.w, g.gx.h), h.scanlines.paint(g.gx), g.gx.ctx.translate(g.gx.offset_x, g.gx.offset_y), g.gx.ctx.scale(g.gx.scale, g.gx.scale), g.fx.ctx.save(), g.fx.ctx.translate(h.world.max_x / 2 - 3 * a, h.world.max_y / 2 - 1.5 * a), g.fx.ctx.scale(a, 1.4 * a), g.gx.ctx.save(), g.gx.ctx.translate(h.world.max_x / 2 - 3 * a, h.world.max_y / 2 - 1.5 * a), g.gx.ctx.scale(a, 1.4 * a), g.fx.lineWidth = 0, g.gx.lineWidth = 0, g.fx.ctx.lineWidth = .05, g.fx.ctx.strokeStyle = "#000", g.gx.ctx.lineWidth = .05, g.gx.ctx.fillStyle = "#fff", g.gx.ctx.strokeStyle = "#000", "1" === s[e][t] ? g.fx.ctx.fillStyle = "rgba(255, 255, 255, 1)" : g.fx.ctx.fillStyle = "rgba(0, 255, 255, 0.2)", g.fx.ctx.beginPath(), g.fx.ctx.rect(t, e, 1, 1), g.fx.ctx.fill(), g.fx.ctx.stroke(), "1" === s[e][t] && (g.gx.ctx.beginPath(), g.gx.ctx.rect(t, e, 1, 1), g.gx.ctx.fill(), g.gx.ctx.stroke()), g.gx.ctx.restore(), g.fx.ctx.restore(), g.gx.ctx.restore(), g.fx.ctx.restore(), g.ex.ctx.restore()
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {}

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        h.el.innerHTML = "", h.el.innerHTML = '<div id="ex"><canvas id="cex"></canvas></div><div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, g.ex = {}, g.ex.wrap = document.getElementById("ex"), g.ex.w = g.ex.wrap.offsetWidth, g.ex.h = g.ex.wrap.offsetHeight, g.ex.el = document.getElementById("cex"), g.ex.el.width = g.ex.w, g.ex.el.height = g.ex.h, g.ex.ctx = g.ex.el.getContext("2d"), g.ex.scale_x = g.ex.w / h.world.max_x, g.ex.scale_y = g.ex.h / h.world.max_y, g.ex.scale = Math.min(g.ex.scale_x, g.ex.scale_y), g.ex.offset_x = g.ex.w / 2 - h.world.max_x * g.ex.scale / 2, g.ex.offset_y = g.ex.h / 2 - h.world.max_y * g.ex.scale / 2, g.fx = {}, g.fx.wrap = document.getElementById("fx"), g.fx.w = g.fx.wrap.offsetWidth, g.fx.h = g.fx.wrap.offsetHeight, g.fx.el = document.getElementById("cfx"), g.fx.el.width = g.fx.w, g.fx.el.height = g.fx.h, g.fx.ctx = g.fx.el.getContext("2d"), g.fx.scale_x = g.fx.w / h.world.max_x, g.fx.scale_y = g.fx.h / h.world.max_y, g.fx.scale = Math.min(g.fx.scale_x, g.fx.scale_y), g.fx.offset_x = g.fx.w / 2 - h.world.max_x * g.fx.scale / 2, g.fx.offset_y = g.fx.h / 2 - h.world.max_y * g.fx.scale / 2, g.gx = {}, g.gx.wrap = document.getElementById("gx"), g.gx.w = g.gx.wrap.offsetWidth, g.gx.h = g.gx.wrap.offsetHeight, g.gx.el = document.getElementById("cgx"), g.gx.el.width = g.gx.w, g.gx.el.height = g.gx.h, g.gx.ctx = g.gx.el.getContext("2d"), g.gx.scale_x = g.gx.w / h.world.max_x, g.gx.scale_y = g.gx.h / h.world.max_y, g.gx.scale = Math.min(g.gx.scale_x, g.gx.scale_y), g.gx.offset_x = g.gx.w / 2 - h.world.max_x * g.gx.scale / 2, g.gx.offset_y = g.gx.h / 2 - h.world.max_y * g.gx.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.world = new World({
        max_x: 1024,
        max_y: 1024
    }), this.show_meta = !1, this.raf = null, this.stopped = !1, this.at = 0, this.scanlines = new Scanlines;
    var f = 0,
        m = 0,
        d = 0,
        p = [
            ["011110".split(""), "110001".split(""), "011110".split("")],
            ["011110".split(""), "101001".split(""), "011110".split("")],
            ["011110".split(""), "100101".split(""), "011110".split("")],
            ["011110".split(""), "100011".split(""), "011110".split("")]
        ],
        g = {
            fx: null,
            gx: null
        }, _ = .05;
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.render_test = function(t, e) {
    function a() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, this.angle = this.angle - .05 * e, this.timer < 6 ? this.limit = this.limit + 1 : (this.limit = this.limit - 2, this.limit < 2 && (this.limit = 2))
    }

    function s() {
        var t, e, a = Date.now();
        d.fx.ctx.save(), d.fx.ctx.clearRect(0, 0, d.fx.w, d.fx.h), d.fx.ctx.translate(d.fx.offset_x, d.fx.offset_y), d.fx.ctx.scale(d.fx.scale, d.fx.scale), d.fx.ctx.fillStyle = "#ff00ff";
        var s = 16,
            i = 20,
            x = this.limit,
            o = 42,
            l = h.world.max_x / 2 - i * Math.floor(x / 2),
            c = h.world.max_y / 2 - i * o / 2;
        for (e = 0; o > e; e++)
            for (t = 0; x > t; t++) d.fx.ctx.save(), d.fx.ctx.translate(l + t * i, c + e * i), d.fx.ctx.rotate(this.angle + (.1 * e + .02 * t)), d.fx.ctx.beginPath(), d.fx.ctx.fillRect(-s / 2, -s / 2, s, s / 4), d.fx.ctx.restore();
        d.fx.ctx.restore(), this.timer = Date.now() - a;
        var n;
        for (f.push(this.timer), f.length > 120 && f.shift(), m.push(this.limit * o), m.length > 120 && m.shift(), d.fx.ctx.font = "36pt ubuntu mono", d.fx.ctx.textBaseline = "middle", d.fx.ctx.textAlign = "center", n = 0, t = f.length; t--;) n += f[t];
        n /= f.length, d.fx.ctx.fillStyle = "#fff", n > 14 && (d.fx.ctx.fillStyle = "#f00");
        var r = 0;
        for (t = m.length; t--;) r += m[t];
        r /= m.length, d.fx.ctx.fillText("painting " + r.toFixed(0) + " objects in " + n.toFixed(1) + "ms", h.w / 2, h.h - 48)
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {
        this.limit = 1, this.timer = 0, this.angle = 0
    }

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        h.el.innerHTML = "", h.el.innerHTML = '<div id="fx"><canvas id="cfx"></canvas></div>', h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, d.fx = {}, d.fx.wrap = document.getElementById("fx"), d.fx.w = d.fx.wrap.offsetWidth, d.fx.h = d.fx.wrap.offsetHeight, d.fx.el = document.getElementById("cfx"), d.fx.el.width = d.fx.w, d.fx.el.height = d.fx.h, d.fx.ctx = d.fx.el.getContext("2d"), d.fx.scale_x = d.fx.w / h.world.max_x, d.fx.scale_y = d.fx.h / h.world.max_y, d.fx.scale = Math.min(d.fx.scale_x, d.fx.scale_y), d.fx.offset_x = d.fx.w / 2 - h.world.max_x * d.fx.scale / 2, d.fx.offset_y = d.fx.h / 2 - h.world.max_y * d.fx.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.world = new World({
        max_x: 1024,
        max_y: 1024
    }), this.show_meta = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var f = [],
        m = [],
        d = {
            fx: null
        };
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.scope_chain = function(t, e) {
    function a() {
        r.stopped = !1, r.at = Date.now(), r.raf = window.requestAnimationFrame(o)
    }

    function s() {
        var t = Date.now(),
            e = r.delta = (t - r.at) / 16.77;
        r.at = t, r.scanlines.update(e)
    }

    function i() {
        h.fx.ctx.clearRect(0, 0, r.w, r.h), r.scanlines.paint(h.fx), h.fx.ctx.save(), h.fx.ctx.translate(h.fx.offset_x, h.fx.offset_y), h.fx.ctx.scale(h.fx.scale, h.fx.scale), x(), h.fx.ctx.restore()
    }

    function x() {
        var t = ["function render(){", "  for(var i=0, ii=world.bombs.length; i<ii; i++){", "    var bomb = world.bombs[i]", "    ctx.fillStyle = bomb.color;", "    ctx.fillRect(bomb.x, bomb.y, 8, 8);", "  }", "}"];
        h.fx.ctx.fillStyle = "#0f0", h.fx.ctx.font = "32pt monospace";
        for (var e = .3 * r.max_y, a = 0; a < t.length; a++) h.fx.ctx.fillText(t[a], .07 * r.max_x, e + 56 * a)
    }

    function o() {
        s(), i(), r.stopped || (r.raf = window.requestAnimationFrame(o))
    }

    function l() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas><h2>Scope Chain</h2></div>', r.el.innerHTML = t, r.w = r.el.offsetWidth, r.h = r.el.offsetHeight, h.fx = {}, h.fx.wrap = document.getElementById("fx"), h.fx.el = document.getElementById("cfx"), h.fx.ctx = h.fx.el.getContext("2d"), h.fx.w = h.fx.wrap.offsetWidth, h.fx.h = h.fx.wrap.offsetHeight, h.fx.el.width = h.fx.w, h.fx.el.height = h.fx.h, h.fx.scale_x = h.fx.w / r.max_x, h.fx.scale_y = h.fx.h / r.max_y, h.fx.scale = Math.min(h.fx.scale_x, h.fx.scale_y), h.fx.offset_x = h.fx.w / 2 - r.max_x * h.fx.scale / 2, h.fx.offset_y = h.fx.h / 2 - r.max_y * h.fx.scale / 2, a()
    }

    function c() {
        r.stopped = !0
    }

    function n() {
        r.stopped || (c(), setTimeout(l, 100))
    }
    var r = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700;
    var h = {
        fx: null
    };
    return this.scanlines = new Scanlines, window.onresize = n, {
        start: l,
        stop: c
    }
}, Scenes.subtitle = function(t, e) {
    function a() {
        r.y = .11 * r.max_y
    }

    function s() {
        a(), r.stopped = !1, r.at = Date.now(), r.raf = window.requestAnimationFrame(o)
    }

    function i() {
        var t = Date.now(),
            e = r.delta = (t - r.at) / 16.77;
        r.at = t, r.scanlines.update(e)
    }

    function x() {
        h.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", h.fx.ctx.fillRect(0, 0, r.w, r.h), h.fx.ctx.save(), h.fx.ctx.translate(h.gx.offset_x, h.gx.offset_y), h.fx.ctx.scale(h.gx.scale, h.gx.scale), h.fx.ctx.strokeStyle = "#fff";
        var t = Math.random() * r.max_y;
        Math.random() < .1 && (h.fx.ctx.beginPath(), h.fx.ctx.moveTo(0, t), h.fx.ctx.lineTo(r.max_x, t), h.fx.ctx.stroke()), h.gx.ctx.clearRect(0, 0, r.w, r.h), r.scanlines.paint(h.gx), h.gx.ctx.save(), h.gx.ctx.translate(h.gx.offset_x, h.gx.offset_y), h.gx.ctx.scale(h.gx.scale, h.gx.scale), h.gx.ctx.translate(Math.random(), Math.random()), h.gx.ctx.translate(r.max_x / 2, r.max_y / 2), h.gx.ctx.translate(Math.random(), Math.random()), h.gx.ctx.font = "36pt ubuntu mono", h.gx.ctx.textBaseline = "middle", h.gx.ctx.textAlign = "center", h.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (h.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (h.gx.ctx.fillStyle = "#090"), h.gx.ctx.fillText(r.subtitle, 0, 0), h.gx.ctx.restore(), h.gx.ctx.restore(), h.fx.ctx.restore()
    }

    function o() {
        i(), x(), r.stopped || (r.raf = window.requestAnimationFrame(o))
    }

    function l() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', r.el.innerHTML = t, r.w = r.el.offsetWidth, r.h = r.el.offsetHeight, h.fx = {}, h.fx.wrap = document.getElementById("fx"), h.fx.el = document.getElementById("cfx"), h.fx.ctx = h.fx.el.getContext("2d"), h.fx.w = h.fx.wrap.offsetWidth, h.fx.h = h.fx.wrap.offsetHeight, h.fx.el.width = h.fx.w, h.fx.el.height = h.fx.h, h.fx.scale_x = h.fx.w / r.max_x, h.fx.scale_y = h.fx.h / r.max_y, h.fx.scale = Math.min(h.fx.scale_x, h.fx.scale_y), h.fx.offset_x = h.fx.w / 2 - r.max_x * h.fx.scale / 2, h.fx.offset_y = h.fx.h / 2 - r.max_y * h.fx.scale / 2, h.gx = {}, h.gx.wrap = document.getElementById("gx"), h.gx.el = document.getElementById("cgx"), h.gx.ctx = h.gx.el.getContext("2d"), h.gx.w = h.gx.wrap.offsetWidth, h.gx.h = h.gx.wrap.offsetHeight, h.gx.el.width = h.gx.w, h.gx.el.height = h.gx.h, h.gx.scale_x = h.gx.w / r.max_x, h.gx.scale_y = h.gx.h / r.max_y, h.gx.scale = Math.min(h.gx.scale_x, h.gx.scale_y), h.gx.offset_x = h.gx.w / 2 - r.max_x * h.gx.scale / 2, h.gx.offset_y = h.gx.h / 2 - r.max_y * h.gx.scale / 2, s()
    }

    function c() {
        r.stopped = !0
    }

    function n() {
        r.stopped || (c(), setTimeout(l, 100))
    }
    var r = this;
    this.el = t, this.raf = null, this.stopped = !1, this.subtitle = e.subtitle || "", this.max_x = 1600, this.max_y = 700, this.y = .5 * this.max_y, this.v = 4, this.prevs = [], this.trails = 15;
    var h = {
        fx: null,
        gx: null
    };
    return this.scanlines = new Scanlines, window.onresize = n, {
        start: l,
        stop: c
    }
}, Scenes.theend = function(t, e) {
    function a() {
        var t = Date.now(),
            e = r.delta = (t - r.at) / 16.77;
        d += (t - r.at) / 1e3, r.at = t, d > h.duration && (f++, f < p.length && (h = p[f], d = 0)), r.scanlines.update(e)
    }

    function s() {
        m.fx.ctx.clearRect(0, 0, r.w, r.h), r.scanlines.paint(m.fx), m.fx.ctx.save(), m.fx.ctx.translate(m.fx.offset_x, m.fx.offset_y), m.fx.ctx.scale(m.fx.scale, m.fx.scale), h.paint && h.paint(), m.fx.ctx.restore()
    }

    function i() {
        var t = 600 * d;
        r.ix = Math.floor(100 * d) % r.iy;
        var e = m.fx.ctx;
        e.save(), e.translate(r.max_x / 2, r.max_y / 2), e.beginPath(), e.fillStyle = r.colors[r.ix], e.arc(0, 0, t, 0, 2 * Math.PI), e.fill(), e.beginPath(), e.fillStyle = "#000", e.arc(0, 0, t / 4, 0, 2 * Math.PI), e.fill(), e.fillStyle = "#000", e.font = "82pt ubuntu mono", e.textBaseline = "middle", e.textAlign = "center", e.fillText("THE END", 0, 0), e.fillStyle = r.colors[r.ix], e.font = "80pt ubuntu mono", e.textBaseline = "middle", e.textAlign = "center", e.save(), e.translate(4 * Math.random(), 4 * Math.random()), e.fillText("THE END", 0, 0), e.restore(), e.restore()
    }

    function x() {
        var t = ["@simon_swain", "simonswain.com/coldwar", "", "#{@$`%+NO CARRIER", ""],
            e = Math.floor(d / 4);
        e >= t.length && (e = t.length);
        var a = Math.ceil(40 * (d / 4 - Math.floor(d / 4)));
        m.fx.ctx.fillStyle = "#0ff", Math.random() < .05 && (m.fx.ctx.fillStyle = "#0cc"), Math.random() < .01 && (m.fx.ctx.fillStyle = "#099"), m.fx.ctx.font = "28pt ubuntu mono", m.fx.ctx.save(), m.fx.ctx.translate(Math.random(), Math.random());
        for (var s = .9 * r.max_y - 40 * e, i = 0; e > i; i++) i === e - 1 ? (m.fx.ctx.fillText(t[i].substr(0, a), .2 * r.max_x, s + 40 * i), a < t[e - 1].length && (m.fx.ctx.fillStyle = "#0ff", m.fx.ctx.fillRect(.2 * r.max_x + 20 * a - 32, .9 * r.max_y - 32, 32, 8))) : m.fx.ctx.fillText(t[i], .2 * r.max_x, s + 40 * i);
        m.fx.ctx.restore()
    }

    function o() {
        a(), s(), r.stopped || (r.raf = window.requestAnimationFrame(o))
    }

    function l() {
        r.stopped = !1, r.at = Date.now(), f = 0, h = p[f], r.raf = window.requestAnimationFrame(o)
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div>', r.el.innerHTML = t, r.w = r.el.offsetWidth, r.h = r.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / r.max_x, m.fx.scale_y = m.fx.h / r.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - r.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - r.max_y * m.fx.scale / 2, l()
    }

    function n() {
        r.stopped = !0
    }
    var r = this;
    this.el = t, this.raf = null, this.stopped = !1, this.at = 0, this.max_x = 1600, this.max_y = 900;
    var h, f, m = {
            fx: null
        }, d = 0,
        p = [{
            duration: 8,
            paint: i
        }, {
            duration: 10,
            paint: x
        }];
    return this.scanlines = new Scanlines, this.colors = ["#fff", "#000", "#f0f", "#ff0", "#f00", "0ff"], this.ix = 0, this.iy = this.colors.length, {
        start: c,
        stop: n
    }
}, Scenes.theend_wdyk = function(t, e) {
    function a() {
        var t = Date.now(),
            e = n.delta = (t - n.at) / 16.77;
        m += (t - n.at) / 1e3, n.at = t, m > r.duration && (h++, h < d.length && (r = d[h], m = 0)), n.scanlines.update(e)
    }

    function s() {
        f.fx.ctx.clearRect(0, 0, n.w, n.h), n.scanlines.paint(f.fx), f.fx.ctx.save(), f.fx.ctx.translate(f.fx.offset_x, f.fx.offset_y), f.fx.ctx.scale(f.fx.scale, f.fx.scale), r.paint && r.paint(), f.fx.ctx.restore()
    }

    function i() {
        var t = 600 * m;
        n.ix = Math.floor(100 * m) % n.iy;
        var e = f.fx.ctx;
        e.save(), e.translate(n.max_x / 2, n.max_y / 2), e.beginPath(), e.fillStyle = n.colors[n.ix], e.arc(0, 0, t, 0, 2 * Math.PI), e.fill(), e.beginPath(), e.fillStyle = "#000", e.arc(0, 0, t / 4, 0, 2 * Math.PI), e.fill(), e.fillStyle = "#000", e.font = "82pt monospace", e.textBaseline = "middle", e.textAlign = "center", e.fillText("THE END", 0, 0), e.fillStyle = n.colors[n.ix], e.font = "80pt monospace", e.textBaseline = "middle", e.textAlign = "center", e.fillText("THE END", 0, 0), e.restore()
    }

    function x() {
        a(), s(), n.stopped || (n.raf = window.requestAnimationFrame(x))
    }

    function o() {
        n.stopped = !1, n.at = Date.now(), h = 0, r = d[h], n.raf = window.requestAnimationFrame(x)
    }

    function l() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div>', n.el.innerHTML = t, n.w = n.el.offsetWidth, n.h = n.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / n.max_x, f.fx.scale_y = f.fx.h / n.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - n.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - n.max_y * f.fx.scale / 2, o()
    }

    function c() {
        n.stopped = !0
    }
    var n = this;
    this.el = t, this.raf = null, this.stopped = !1, this.at = 0, this.max_x = 1600, this.max_y = 900;
    var r, h, f = {
            fx: null
        }, m = 0,
        d = [{
            duration: 100,
            paint: i
        }];
    return this.scanlines = new Scanlines, this.colors = ["#fff", "#000", "#f0f", "#ff0", "#f00", "0ff"], this.ix = 0, this.iy = this.colors.length, {
        start: l,
        stop: c
    }
}, Scenes.title = function(t, e) {
    function a() {
        var t = Date.now(),
            e = n.delta = (t - n.at) / 16.77;
        n.at = t, n.scanlines.update(e);
        for (n.bombs.length < 4 * Math.random() && n.bombs.push(new Streamer({
            x: n.max_x * Math.random(),
            y: 0,
            target: {
                dead: !1,
                pos: new Vec3(Math.random() * n.world.max_x, n.world.max_y * (.7 + .3 * Math.random()))
            },
            booms: n.booms
        })), i = 0, x = n.bombs.length; x > i; i++) n.bombs[i].update(e), n.bombs[i].pos.x += 1 - 2 * Math.random(), n.bombs[i].dead && (n.bombs.splice(i, 1), i--, x--);
        if (n.booms.length < 10 && Math.random() < .1) {
            var a, s;
            a = n.w * Math.random(), s = n.h * Math.random(), n.booms.push(new Boom({
                x: a,
                y: s,
                radius: 100 + 200 * Math.random(),
                color: "255,255,255"
            })), Math.random() < .25 && n.booms.push(new Boom({
                style: "expand",
                x: a + (100 * Math.random() - 100),
                y: s + (200 * Math.random() - 100),
                radius: 200 + 150 * Math.random(),
                color: "0,0,0"
            })), Math.random() < .1 && n.booms.push(new Boom({
                style: "expand",
                x: a + (100 * Math.random() - 100),
                y: s + (200 * Math.random() - 100),
                radius: 800 + 300 * Math.random(),
                color: "255,255,255"
            }))
        }
        for (var i = 0, x = n.booms.length; x > i; i++) n.booms[i].update(e), n.booms[i].pos.x += 5 - 10 * Math.random(), n.booms[i].pos.y -= 4 - 1 * Math.random(), n.booms[i].dead && (n.booms.splice(i, 1), i--, x--)
    }

    function s() {
        r.fx.ctx.clearRect(0, 0, n.w, n.h), Math.random() < .01 && (r.fx.ctx.fillStyle = "rgba(255, 0, 0, 1)", r.fx.ctx.fillRect(0, 0, n.w, n.h)), Math.random() < .01 && (r.fx.ctx.fillStyle = "rgba(0, 255, 255, 1)", r.fx.ctx.fillRect(0, 0, n.w, n.h)), Math.random() < .01 && (r.fx.ctx.fillStyle = "rgba(255, 255, 255, 1)", r.fx.ctx.fillRect(0, 0, n.w, n.h)), Math.random() < 1e-4 && (r.fx.ctx.fillStyle = "rgba(255, 0, 255, 1)", r.fx.ctx.fillRect(0, 0, n.w, n.h)), r.fx.ctx.save(), r.fx.ctx.translate(3 * Math.random(), 3 * Math.random()), r.fx.ctx.fillStyle = "#0f0", r.fx.ctx.font = "48pt ubuntu mono", r.fx.ctx.textBaseline = "middle", r.fx.ctx.textAlign = "center", r.fx.ctx.fillText("COLD WAR", n.w / 2, n.h / 2), r.fx.ctx.restore(), r.fx.ctx.save(), r.fx.ctx.translate(3 * Math.random(), 3 * Math.random()), r.fx.ctx.fillStyle = "#0ff", r.fx.ctx.font = "30pt ubuntu mono", r.fx.ctx.textBaseline = "middle", r.fx.ctx.textAlign = "center", r.fx.ctx.fillText("@simon_swain", n.w / 2, .9 * n.h), r.fx.ctx.restore(), n.scanlines.paint(r.fx);
        var t, e;
        for (t = 0, e = n.booms.length; e > t; t++) n.booms[t].paint(r.fx);
        for (r.ex.ctx.fillStyle = "rgba(0, 0, 0, 0.1)", r.ex.ctx.fillRect(0, 0, n.w, n.h), r.ex.ctx.save(), r.ex.ctx.translate(r.ex.offset_x, r.ex.offset_y), r.ex.ctx.scale(r.ex.scale, r.ex.scale), t = 0, e = n.bombs.length; e > t; t++) n.bombs[t].paint(r.ex);
        r.ex.ctx.restore()
    }

    function i() {
        a(), s(), n.stopped || (n.raf = window.requestAnimationFrame(i))
    }

    function x() {
        n.stopped = !1, n.at = Date.now(), n.raf = window.requestAnimationFrame(i)
    }

    function o() {
        n.el.innerHTML = "", n.el.innerHTML = '<div id="ex"><canvas id="cex"></canvas><div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', n.w = n.el.offsetWidth, n.h = n.el.offsetHeight, r.ex = {}, r.ex.wrap = document.getElementById("ex"), r.ex.w = r.ex.wrap.offsetWidth, r.ex.h = r.ex.wrap.offsetHeight, r.ex.el = document.getElementById("cex"), r.ex.el.width = r.ex.w, r.ex.el.height = r.ex.h, r.ex.ctx = r.ex.el.getContext("2d"), r.ex.scale_x = r.ex.w / n.world.max_x, r.ex.scale_y = r.ex.h / n.world.max_y, r.ex.scale = Math.min(r.ex.scale_x, r.ex.scale_y), r.ex.offset_x = r.ex.w / 2 - n.world.max_x * r.ex.scale / 2, r.ex.offset_y = r.ex.h / 2 - n.world.max_y * r.ex.scale / 2, r.fx = {}, r.fx.wrap = document.getElementById("fx"), r.fx.w = r.fx.wrap.offsetWidth, r.fx.h = r.fx.wrap.offsetHeight, r.fx.el = document.getElementById("cfx"), r.fx.el.width = r.fx.w, r.fx.el.height = r.fx.h, r.fx.ctx = r.fx.el.getContext("2d"), r.fx.scale_x = r.fx.w / n.world.max_x, r.fx.scale_y = r.fx.h / n.world.max_y, r.fx.scale = Math.min(r.fx.scale_x, r.fx.scale_y), r.fx.offset_x = r.fx.w / 2 - n.world.max_x * r.fx.scale / 2, r.fx.offset_y = r.fx.h / 2 - n.world.max_y * r.fx.scale / 2, r.ex = {}, r.ex.wrap = document.getElementById("ex"), r.ex.w = r.ex.wrap.offsetWidth, r.ex.h = r.ex.wrap.offsetHeight, r.ex.el = document.getElementById("cex"), r.ex.el.width = r.ex.w, r.ex.el.height = r.ex.h, r.ex.ctx = r.ex.el.getContext("2d"), r.ex.scale_x = r.ex.w / n.world.max_x, r.ex.scale_y = r.ex.h / n.world.max_y, r.ex.scale = Math.min(r.ex.scale_x, r.ex.scale_y), r.ex.offset_x = r.ex.w / 2 - n.world.max_x * r.ex.scale / 2, r.ex.offset_y = r.ex.h / 2 - n.world.max_y * r.ex.scale / 2, x()
    }

    function l() {
        n.stopped = !0
    }

    function c() {
        n.stopped || (l(), setTimeout(o, 100))
    }
    var n = this;
    this.el = t, this.raf = null, this.stopped = !1, this.at = 0, this.world = new World({
        max_x: 1024,
        max_y: 1024
    }), this.bomb_max = e.bomb_max || 5, this.bombs_per_tick = e.bombs_per_tick || 1, this.max_x = 1600, this.max_y = 900, this.scanlines = new Scanlines;
    var r = {
        fx: null,
        ex: null
    };
    return this.booms = [], this.bombs = [], window.onresize = c, {
        start: o,
        stop: l
    }
}, Scenes.transforms = function(t, e) {
    function a() {
        h.y = .11 * h.max_y
    }

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.time += e / 100, h.time > 3 && (h.scene = h.scene + 1, h.time = 0, h.scene >= m.length && (h.scene = 0)), h.scanlines.update(e)
    }

    function x() {
        f.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", f.fx.ctx.fillRect(0, 0, h.w, h.h), f.fx.ctx.save(), f.fx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.fx.ctx.scale(f.gx.scale, f.gx.scale), f.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(f.gx), f.gx.ctx.save(), f.gx.ctx.translate(f.gx.offset_x, f.gx.offset_y), f.gx.ctx.scale(f.gx.scale, f.gx.scale), o(), f.gx.ctx.lineWidth = 4, f.gx.ctx.strokeStyle = "#fff", f.gx.ctx.beginPath(), f.gx.ctx.rect(.05 * h.max_x, .05 * h.max_y, .9 * h.max_x, .9 * h.max_y), f.gx.ctx.stroke(), f.gx.ctx.restore(), f.fx.ctx.restore()
    }

    function o() {
        f.fx.ctx.save(), f.fx.ctx.translate(.05 * h.max_x, .05 * h.max_y), f.fx.ctx.rotate(h.angle), f.fx.ctx.scale(160, 160), m[h.scene].paint(f.fx.ctx), f.fx.ctx.restore(), f.gx.ctx.save(), f.gx.ctx.translate(Math.random(), Math.random()), f.gx.ctx.fillStyle = "#0f0", Math.random() < .05 && (f.gx.ctx.fillStyle = "#0c0"), Math.random() < .01 && (f.gx.ctx.fillStyle = "#090"), f.gx.ctx.font = "36pt ubuntu mono";
        for (var t = m[h.scene].code, e = h.max_y - .05 * h.max_x, a = t.length; a > 0; a--) f.gx.ctx.fillText(t[t.length - a], .1 * h.max_x, e - 56 * a);
        f.gx.ctx.restore()
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, f.fx = {}, f.fx.wrap = document.getElementById("fx"), f.fx.el = document.getElementById("cfx"), f.fx.ctx = f.fx.el.getContext("2d"), f.fx.w = f.fx.wrap.offsetWidth, f.fx.h = f.fx.wrap.offsetHeight, f.fx.el.width = f.fx.w, f.fx.el.height = f.fx.h, f.fx.scale_x = f.fx.w / h.max_x, f.fx.scale_y = f.fx.h / h.max_y, f.fx.scale = Math.min(f.fx.scale_x, f.fx.scale_y), f.fx.offset_x = f.fx.w / 2 - h.max_x * f.fx.scale / 2, f.fx.offset_y = f.fx.h / 2 - h.max_y * f.fx.scale / 2, f.gx = {}, f.gx.wrap = document.getElementById("gx"), f.gx.el = document.getElementById("cgx"), f.gx.ctx = f.gx.el.getContext("2d"), f.gx.w = f.gx.wrap.offsetWidth, f.gx.h = f.gx.wrap.offsetHeight, f.gx.el.width = f.gx.w, f.gx.el.height = f.gx.h, f.gx.scale_x = f.gx.w / h.max_x, f.gx.scale_y = f.gx.h / h.max_y, f.gx.scale = Math.min(f.gx.scale_x, f.gx.scale_y), f.gx.offset_x = f.gx.w / 2 - h.max_x * f.gx.scale / 2, f.gx.offset_y = f.gx.h / 2 - h.max_y * f.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 1200, this.max = Math.min(this.max_x, this.max_y), this.y = .5 * this.max_y, this.v = 4, this.time = 0, this.scene = 0, this.scale = 0;
    var f = {
        fx: null,
        gx: null
    };
    this.scanlines = new Scanlines;
    var m = [{
        paint: function(t) {
            t.lineWidth = .1, t.strokeStyle = "#c000ff", t.beginPath(), t.moveTo(1, 0), t.lineTo(1, 1), t.lineTo(0, 1), t.stroke()
        },
        code: ["ctx.rect(-1, -1, 2, 2);"]
    }, {
        paint: function(t) {
            t.translate(4.75, 3.4), t.lineWidth = .1, t.beginPath(), t.strokeStyle = "#c000ff", t.rect(-1, -1, 2, 2), t.stroke()
        },
        code: ["ctx.save();", "ctx.translate(w/2, h/2);", "ctx.rect(-1, -1, 2, 2);", "ctx.restore();"]
    }, {
        paint: function(t) {
            t.translate(4.75, 3.4), t.rotate(.25 * Math.PI), t.lineWidth = .1, t.beginPath(), t.strokeStyle = "#c000ff", t.rect(-1, -1, 2, 2), t.stroke()
        },
        code: ["ctx.save();", "ctx.translate(w/2, h/2);", "ctx.rotate(Math.PI/2);", "ctx.rect(-1, -1, 2, 2);", "ctx.restore();"]
    }, {
        paint: function(t) {
            t.translate(4.75, 3.4), t.rotate(.25 * Math.PI), t.scale(2, 2), t.lineWidth = .1, t.beginPath(), t.strokeStyle = "#c000ff", t.rect(-1, -1, 2, 2), t.stroke()
        },
        code: ["ctx.save();", "ctx.translate(w/2, h/2);", "ctx.rotate(Math.PI/2);", "ctx.scale(2, 2);", "ctx.rect(-1, -1, 2, 2);", "ctx.restore();"]
    }];
    return window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.vec3 = function(t, e) {
    function a() {
        h.obj = new Vec3(h.max_x * Math.random(), h.max_y * Math.random(), h.max_z / 2), h.velo = new Vec3(-50 + 100 * Math.random(), -50 + 100 * Math.random(), 1.5 + 1 * Math.random())
    }

    function s() {
        a(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(l)
    }

    function i() {
        f++, f > 150 && (f = 0, a());
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        h.at = t, h.laser = !1, h.scanlines.update(e), h.obj.x = h.obj.x + h.velo.x * e, h.obj.x += Math.random() - .5, h.obj.x < 0 && (h.obj.x = 0, h.velo.x = -h.velo.x), h.obj.x > h.max_x && (h.obj.x = h.max_x, h.velo.x = -h.velo.x), h.obj.y = h.obj.y + h.velo.y * e, h.obj.y += Math.random() - .5, h.obj.y < 0 && (h.obj.y = 0, h.velo.y = -h.velo.y), h.obj.y > h.max_y && (h.obj.y = h.max_y, h.velo.y = -h.velo.y), h.obj.z = h.obj.z + h.velo.z * e, h.obj.z += Math.random() - .5, h.obj.z < .1 * h.max_z && (h.obj.z = .1 * h.max_z, h.velo.z = -h.velo.z), h.obj.z > h.max_z && (h.obj.z = h.max_z, h.velo.z = -h.velo.z)
    }

    function x() {
        m.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.15)", m.fx.ctx.fillRect(0, 0, h.w, h.h), Math.random() < .005 && (m.fx.ctx.fillStyle = "rgba(255, 0, 255, 1)", m.fx.ctx.fillRect(0, 0, h.w, h.h)), m.fx.ctx.save(), m.fx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.fx.ctx.scale(m.gx.scale, m.gx.scale), m.gx.ctx.clearRect(0, 0, h.w, h.h), h.scanlines.paint(m.gx), m.gx.ctx.save(), m.gx.ctx.translate(m.gx.offset_x, m.gx.offset_y), m.gx.ctx.scale(m.gx.scale, m.gx.scale), o(), m.fx.ctx.fillStyle = "#f0f", m.fx.ctx.beginPath(), m.fx.ctx.arc(h.obj.x, h.obj.y, h.obj.z, 0, 2 * Math.PI), m.fx.ctx.fill(), m.fx.ctx.strokeStyle = "#fff", m.fx.ctx.lineWidth = 8, m.fx.ctx.lineCap = "round", m.fx.ctx.beginPath(), m.fx.ctx.moveTo(h.obj.x, h.obj.y), m.fx.ctx.lineTo(h.obj.x + 2 * h.velo.x, h.obj.y + 2 * h.velo.y), m.fx.ctx.stroke(), m.gx.ctx.restore(), m.fx.ctx.restore(), m.gx.ctx.font = "24pt ubuntu mono", m.gx.ctx.textBaseline = "middle", m.gx.ctx.textAlign = "right", m.gx.ctx.fillStyle = "#fff", m.gx.ctx.fillText(h.obj.x.toFixed(0) + " x ", m.gx.w - 256, m.gx.h - 232), m.gx.ctx.fillText(h.obj.y.toFixed(0) + " y ", m.gx.w - 256, m.gx.h - 196), m.gx.ctx.fillText(h.obj.z.toFixed(0) + " z ", m.gx.w - 256, m.gx.h - 160), m.gx.ctx.fillStyle = "#fff", m.gx.ctx.fillText(h.velo.x.toFixed(0) + " dx", m.gx.w - 128, m.gx.h - 232), m.gx.ctx.fillText(h.velo.y.toFixed(0) + " dy", m.gx.w - 128, m.gx.h - 196), m.gx.ctx.fillText(h.velo.z.toFixed(0) + " dz", m.gx.w - 128, m.gx.h - 160)
    }

    function o() {
        m.fx.ctx.textBaseline = "alphabetic", m.fx.ctx.textAlign = "left";
        var t = ["var pos = new Vec3(x, y, z);", "", "var velo = target.pos.minus(pos).normalize();", "velo.scale(thrust);", "", "pos.add(velo);"];
        m.fx.ctx.fillStyle = "#0f0", Math.random() < .05 && (m.fx.ctx.fillStyle = "#090"), Math.random() < .01 && (m.fx.ctx.fillStyle = "#060"), m.fx.ctx.font = "32pt ubuntu mono";
        for (var e = .05 * h.max_y, a = 0; a < t.length; a++) m.fx.ctx.save(), Math.random() < .0025 && m.fx.ctx.rotate(2 * Math.PI * Math.random()), m.fx.ctx.translate(1 * Math.random(), 1 * Math.random()), m.fx.ctx.fillText(t[a], .1 * h.max_x, e + 48 * a), m.fx.ctx.restore()
    }

    function l() {
        i(), x(), h.stopped || (h.raf = window.requestAnimationFrame(l))
    }

    function c() {
        var t;
        t = "", t += '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.el.innerHTML = t, h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, m.fx = {}, m.fx.wrap = document.getElementById("fx"), m.fx.el = document.getElementById("cfx"), m.fx.ctx = m.fx.el.getContext("2d"), m.fx.w = m.fx.wrap.offsetWidth, m.fx.h = m.fx.wrap.offsetHeight, m.fx.el.width = m.fx.w, m.fx.el.height = m.fx.h, m.fx.scale_x = m.fx.w / h.max_x, m.fx.scale_y = m.fx.h / h.max_y, m.fx.scale = Math.min(m.fx.scale_x, m.fx.scale_y), m.fx.offset_x = m.fx.w / 2 - h.max_x * m.fx.scale / 2, m.fx.offset_y = m.fx.h / 2 - h.max_y * m.fx.scale / 2, m.gx = {}, m.gx.wrap = document.getElementById("gx"), m.gx.el = document.getElementById("cgx"), m.gx.ctx = m.gx.el.getContext("2d"), m.gx.w = m.gx.wrap.offsetWidth, m.gx.h = m.gx.wrap.offsetHeight, m.gx.el.width = m.gx.w, m.gx.el.height = m.gx.h, m.gx.scale_x = m.gx.w / h.max_x, m.gx.scale_y = m.gx.h / h.max_y, m.gx.scale = Math.min(m.gx.scale_x, m.gx.scale_y), m.gx.offset_x = m.gx.w / 2 - h.max_x * m.gx.scale / 2, m.gx.offset_y = m.gx.h / 2 - h.max_y * m.gx.scale / 2, s()
    }

    function n() {
        h.stopped = !0
    }

    function r() {
        h.stopped || (n(), setTimeout(c, 100))
    }
    var h = this;
    this.el = t, this.raf = null, this.stopped = !1, this.max_x = 1600, this.max_y = 700, this.max_z = 100, h.velo = 1;
    var f = 0,
        m = {
            fx: null,
            gx: null
        };
    return this.scanlines = new Scanlines, window.onresize = r, {
        start: c,
        stop: n
    }
}, Scenes.vector_graphics = function(t, e) {
    function a() {
        var t = Date.now(),
            e = h.delta = (t - h.at) / 16.77;
        f += (t - h.at) / 750, h.at = t, m += w, m >= 5 && (m = 0, w = 1.08 * w, w > 1 && (w = 1, d += .04, p += .1)), w >= 1 && (u += .03, u > 3 && (y = d, u = 1)), h.scanlines.update(e)
    }

    function s() {
        var t = (Date.now(), .25 * h.world.max);
        _.fx.ctx.fillStyle = "rgba(0, 0, 0, 0.1)", _.fx.ctx.fillRect(0, 0, h.w, h.h), _.fx.ctx.save(), _.fx.ctx.translate(_.fx.offset_x, _.fx.offset_y), _.fx.ctx.scale(_.fx.scale, _.fx.scale);
        var e, a, s = Math.floor(m);
        e = g[s], a = 0 === s ? g[g.length - 1] : g[s - 1], _.fx.ctx.save(), _.fx.ctx.translate(h.world.max_x / 2, h.world.max_y / 2), _.fx.ctx.rotate(d);
        var i = Math.sin(p);
        _.fx.ctx.scale(t + i * t / 2, t + i * t / 2), _.fx.ctx.lineWidth = .05, _.fx.ctx.lineCap = "round", _.fx.ctx.strokeStyle = "#0ff", _.fx.ctx.beginPath(), _.fx.ctx.moveTo(e[0], e[1]), _.fx.ctx.lineTo(a[0], a[1]), _.fx.ctx.stroke(), _.fx.ctx.restore(), w >= 1 && (_.fx.ctx.save(), _.fx.ctx.translate(h.world.max_x / 2, h.world.max_y / 2), _.fx.ctx.rotate(y), _.fx.ctx.scale(t + i * t / 2, t + i * t / 2), _.fx.ctx.fillStyle = "#0ff", _.fx.ctx.beginPath(), _.fx.ctx.arc(u, 0, .05, 0, 2 * Math.PI), _.fx.ctx.fill(), _.fx.ctx.restore()), _.fx.ctx.restore()
    }

    function i() {
        a(), s(), h.stopped || (h.raf = window.requestAnimationFrame(i))
    }

    function x() {}

    function o() {
        x(), h.stopped = !1, h.at = Date.now(), h.raf = window.requestAnimationFrame(i)
    }

    function l() {
        h.el.innerHTML = "", h.el.innerHTML = '<div id="fx"><canvas id="cfx"></canvas></div><div id="gx"><canvas id="cgx"></canvas></div>', h.w = h.el.offsetWidth, h.h = h.el.offsetHeight, _.fx = {}, _.fx.wrap = document.getElementById("fx"), _.fx.w = _.fx.wrap.offsetWidth, _.fx.h = _.fx.wrap.offsetHeight, _.fx.el = document.getElementById("cfx"), _.fx.el.width = _.fx.w, _.fx.el.height = _.fx.h, _.fx.ctx = _.fx.el.getContext("2d"), _.fx.scale_x = _.fx.w / h.world.max_x, _.fx.scale_y = _.fx.h / h.world.max_y, _.fx.scale = Math.min(_.fx.scale_x, _.fx.scale_y), _.fx.offset_x = _.fx.w / 2 - h.world.max_x * _.fx.scale / 2, _.fx.offset_y = _.fx.h / 2 - h.world.max_y * _.fx.scale / 2, _.gx = {}, _.gx.wrap = document.getElementById("gx"), _.gx.w = _.gx.wrap.offsetWidth, _.gx.h = _.gx.wrap.offsetHeight, _.gx.el = document.getElementById("cgx"), _.gx.el.width = _.gx.w, _.gx.el.height = _.gx.h, _.gx.ctx = _.gx.el.getContext("2d"), _.gx.scale_x = _.gx.w / h.world.max_x, _.gx.scale_y = _.gx.h / h.world.max_y, _.gx.scale = Math.min(_.gx.scale_x, _.gx.scale_y), _.gx.offset_x = _.gx.w / 2 - h.world.max_x * _.gx.scale / 2, _.gx.offset_y = _.gx.h / 2 - h.world.max_y * _.gx.scale / 2, o()
    }

    function c() {
        h.stopped = !0
    }

    function n() {
        h.show_meta = !h.show_meta
    }

    function r() {
        h.stopped || (c(), setTimeout(l, 100))
    }
    var h = this;
    this.el = t, this.world = new World({
        max_x: 1024,
        max_y: 1024
    }), this.show_meta = !1, this.raf = null, this.stopped = !1, this.at = 0, this.scanlines = new Scanlines;
    var f = 0,
        m = 0,
        d = 1.5 * Math.PI,
        p = 0,
        g = [
            [1, 0],
            [-1, -1],
            [-.5, 0],
            [-1, 1],
            [1, 0]
        ],
        _ = {
            fx: null,
            gx: null
        }, w = .1,
        u = 4,
        y = d;
    return window.onresize = r, {
        start: l,
        stop: c,
        toggleMeta: n
    }
}, Scenes.war = function(t, e) {
    function a() {
        var t, e, a, s, i, o = Date.now(),
            l = Date.now(),
            c = f.delta = (l - f.at) / 16.77;
        for (f.at = l, f.world.update(), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].update(c), a[s].dead && (a.splice(s, 1), s--, i--);
        f.capitals.length <= 1 && !f.gameover && (f.gameover = !0, setTimeout(x, 7500, f)), d.update = Date.now() - o
    }

    function s() {
        var t, e, a, s, i, x, o = Date.now();
        for (m.map.ctx.clearRect(0, 0, m.map.w, m.map.h), f.world.flash > 0 && (m.map.ctx.fillStyle = "#ffffff", m.map.ctx.fillRect(0, 0, m.map.w, m.map.h)), m.map.ctx.save(), m.map.ctx.translate(m.map.offset_x, m.map.offset_y), m.map.ctx.scale(m.map.scale, m.map.scale), m.elv.ctx.clearRect(0, 0, m.elv.w, m.elv.h), f.world.flash > 0 && (m.elv.ctx.fillStyle = "#fff", m.elv.ctx.fillRect(0, 0, m.elv.w, m.elv.h)), m.elv.ctx.save(), m.elv.ctx.translate(m.elv.offset_x, m.elv.offset_z), m.elv.ctx.scale(m.elv.scale, m.elv.scale), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].paint(m.map), a[s].elevation(m.elv);
        if (m.map.ctx.restore(), m.elv.ctx.restore(), d.paint = Date.now() - o, d.total = d.update + d.paint, f.gameover && Date.now() / 1e3 % 1 > .5 && (m.elv.ctx.fillStyle = "#f00", m.elv.ctx.font = "24pt ubuntu mono", m.elv.ctx.textBaseline = "middle", m.elv.ctx.textAlign = "center", m.elv.ctx.fillText("GAME OVER", m.elv.w / 2, m.elv.h / 2), m.map.ctx.fillStyle = "#f00", m.map.ctx.font = "32pt ubuntu mono", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "center", m.map.ctx.fillText("GAME OVER", m.map.w / 2, m.map.h / 2)), f.show_meta) {
            x = f.w - 32, m.map.ctx.font = "16pt ubuntu mono", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "right", m.map.ctx.fillStyle = "#999", d.update > 12 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.update + "ms update  ", x, 32), m.map.ctx.fillStyle = "#999", d.paint > 12 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.paint + "ms paint   ", x, 56), m.map.ctx.fillStyle = "#999", d.total > 12 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.total + "ms total   ", x, 80), m.map.ctx.font = "16pt ubuntu mono", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "right", m.map.ctx.fillStyle = "#999", m.map.ctx.fillText(f.bombers.length + " bombers ", x, 120), m.map.ctx.fillText(f.fighters.length + " fighters", x, 144), m.map.ctx.fillText(f.icbms.length + " icbms   ", x, 168), m.map.ctx.fillText(f.abms.length + " abms    ", x, 192), m.map.ctx.fillText(f.booms.length + " booms   ", x, 216);
            var l = f.bombers.length + f.fighters.length + f.icbms.length + f.abms.length + f.booms.length;
            m.map.ctx.fillText(l + " total   ", x, 240)
        }
    }

    function i() {
        a(), s(), f.stopped || (f.raf = window.requestAnimationFrame(i))
    }

    function x() {
        f.gameover = !1, f.world.booms = f.booms = [], f.world.capitals = f.capitals = [], f.world.cities = f.cities = [], f.world.bases = f.bases = [], f.world.factories = f.factories = [], f.world.supplies = f.supplies = [], f.world.bombers = f.bombers = [], f.world.fighters = f.fighters = [], f.world.icbms = f.icbms = [], f.world.abms = f.abms = [], f.world.sats = f.sats = [];
        var t = [];
        4 === f.capital_count ? (t.push({
            x: .2 * f.world.max_x,
            y: .6 * f.world.max_y,
            z: 0,
            color: "#fc0"
        }), t.push({
            x: .8 * f.world.max_x,
            y: .4 * f.world.max_y,
            z: 0,
            color: "#0ff"
        }), t.push({
            x: .4 * f.world.max_x,
            y: .2 * f.world.max_y,
            z: 0,
            color: "#f00"
        }), t.push({
            x: .6 * f.world.max_x,
            y: .9 * f.world.max_y,
            z: 0,
            color: "#090"
        })) : t = [{
            x: .2 * f.world.max_x,
            y: .5 * f.world.max_y,
            z: 0,
            color: "#fc0"
        }, {
            x: .8 * f.world.max_x,
            y: .5 * f.world.max_y,
            z: 0,
            color: "#0ff"
        }], f.first_strike ? (t.forEach(function(t, e) {
            t.strike = !1
        }), t[Math.floor(Math.random() * t.length)].strike = !0) : t.forEach(function(t) {
            t.strike = !0
        }), t.forEach(function(t) {
            f.capitals.push(new Capital({
                x: t.x,
                y: t.y,
                z: t.z,
                color: t.color,
                world: f.world,
                strike: t.strike,
                defcon: f.defcon,
                unit_rate: f.unit_rate,
                bases_max: f.bases_max,
                cities_max: f.cities_max,
                factories_max: f.factories_max,
                sats_max: f.sats_max,
                bomber_launch_max: f.bomber_launch_max,
                fighter_launch_max: f.fighter_launch_max,
                icbm_launch_max: f.icbm_launch_max,
                abm_launch_max: f.abm_launch_max,
                stock: {
                    bombers: f.stock.bombers,
                    fighters: f.stock.fighters,
                    icbms: f.stock.icbms,
                    abms: f.stock.abms
                }
            }))
        }), p = [f.supplies, f.capitals, f.cities, f.bases, f.factories, f.bombers, f.fighters, f.icbms, f.abms, f.booms, f.sats]
    }

    function o() {
        x(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(i)
    }

    function l() {
        var t;
        t = "", t += '<div id="map"><canvas id="cMap"></canvas></div>', t += '<div id="elevation"><canvas id="cElevation"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.map = {}, m.map.wrap = document.getElementById("map"), m.map.el = document.getElementById("cMap"), m.map.ctx = m.map.el.getContext("2d"), m.map.w = m.map.wrap.offsetWidth, m.map.h = m.map.wrap.offsetHeight, m.map.el.width = m.map.w, m.map.el.height = m.map.h, m.map.scale_x = m.map.w / f.world.max_x, m.map.scale_y = m.map.h / f.world.max_y, m.map.scale = Math.min(m.map.scale_x, m.map.scale_y), m.map.offset_x = m.map.w / 2 - f.world.max_x * m.map.scale / 2, m.map.offset_y = m.map.h / 2 - f.world.max_y * m.map.scale / 2, m.elv = {}, m.elv.wrap = document.getElementById("elevation"), m.elv.el = document.getElementById("cElevation"), m.elv.ctx = m.elv.el.getContext("2d"), m.elv.w = m.elv.wrap.offsetWidth, m.elv.h = m.elv.wrap.offsetHeight, m.elv.el.width = m.elv.w, m.elv.el.height = m.elv.h, m.elv.scale_x = m.elv.w / f.world.max_x, m.elv.scale_z = m.elv.h / (m.elv.h / f.world.max_z), m.elv.scale = m.elv.scale_x, m.elv.offset_x = m.elv.w / 2 - f.world.max_x * m.elv.scale / 2, m.elv.offset_y = m.elv.h / 2 - m.elv.h / f.world.max_z * m.elv.scale / 2, m.elv.yscale = m.elv.h / f.world.max_z / m.elv.scale, o()
    }

    function c() {
        f.stopped = !0
    }

    function n() {
        f.show_meta = !f.show_meta
    }

    function r() {
        f.world.show_vectors = !f.world.show_vectors
    }

    function h() {
        f.stopped || (c(), setTimeout(l, 100))
    }
    var f = this;
    this.el = t, this.max_x = 1600, this.max_y = 500, this.max_z = 200, f.world = new World({
        max_x: f.max_x,
        max_y: f.max_y,
        max_z: f.max_z
    }), this.capital_count = e.capital_count || 2, this.defcon = e.defcon || 1, this.show_meta = !1, this.unit_rate = e.unit_rate || 0, this.first_strike = e.first_strike || !1, this.units = e.unit || 0, this.bases_max = e.bases_max || 0, this.cities_max = e.cities_max || 0, this.factories_max = e.factories_max || 0, this.bomber_launch_max = e.bomber_launch_max || 0, this.fighter_launch_max = e.fighter_launch_max || 0, this.icbm_launch_max = e.icbm_launch_max || 0, this.abm_launch_max = e.abm_launch_max || 0, this.sats_max = e.sats_max || 0,
    this.stock = e.stock || {
        bombers: 0,
        fighters: 0,
        icbms: 0,
        abms: 0
    }, this.gameover = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var m = {
        map: null,
        elevation: null
    }, d = {
            update: null,
            paint: null
        }, p = [];
    return window.onresize = h, {
        start: l,
        stop: c,
        toggleMeta: n,
        toggleVectors: r
    }
}, Scenes.war_workers = function(t, e) {
    function a() {
        var t, e, a, s, i, o = Date.now(),
            l = Date.now(),
            c = f.delta = (l - f.at) / 16.77;
        for (f.at = l, f.world.update(), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].update(c), a[s].dead && (a.splice(s, 1), s--, i--);
        f.capitals.length <= 1 && !f.gameover && (f.gameover = !0, setTimeout(x, 5e3, f)), d.update = Date.now() - o
    }

    function s() {
        var t, e, a, s, i, x, o = Date.now();
        for (m.map.ctx.save(), m.map.ctx.clearRect(0, 0, m.map.w, m.map.h), m.map.ctx.translate(m.map.offset_x, m.map.offset_y), m.map.ctx.scale(m.map.scale, m.map.scale), m.elv.ctx.save(), m.elv.ctx.clearRect(0, 0, m.elv.w, m.elv.h), m.elv.ctx.translate(m.elv.offset_x, m.elv.offset_z), m.elv.ctx.scale(m.elv.scale, m.elv.scale), m.elv.ctx.clearRect(0, 0, m.elv.w, m.elv.h), t = 0, e = p.length; e > t; t++)
            for (a = p[t], s = 0, i = a.length; i > s; s++) a[s].paint(m.map), a[s].elevation(m.elv);
        if (m.map.ctx.restore(), m.elv.ctx.restore(), d.paint = Date.now() - o, d.total = d.update + d.paint, f.gameover && (m.map.ctx.fillStyle = "#f00", m.map.ctx.font = "32pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "center", m.map.ctx.fillText("GAME OVER", f.w / 2, f.h / 2)), f.show_meta) {
            x = f.w - 32, m.map.ctx.font = "16pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "right", m.map.ctx.fillStyle = "#999", d.update > 16 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.update + " update  ", x, 32), m.map.ctx.fillStyle = "#999", d.paint > 16 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.paint + " paint   ", x, 56), m.map.ctx.fillStyle = "#999", d.total > 16 && (m.map.ctx.fillStyle = "#f00"), m.map.ctx.fillText(d.total + " total   ", x, 80), m.map.ctx.font = "16pt monospace", m.map.ctx.textBaseline = "middle", m.map.ctx.textAlign = "right", m.map.ctx.fillStyle = "#999", m.map.ctx.fillText(f.bombers.length + " bombers ", x, 120), m.map.ctx.fillText(f.fighters.length + " fighters", x, 144), m.map.ctx.fillText(f.icbms.length + " icbms   ", x, 168), m.map.ctx.fillText(f.abms.length + " abms    ", x, 192), m.map.ctx.fillText(f.booms.length + " booms   ", x, 216);
            var l = f.bombers.length + f.fighters.length + f.icbms.length + f.abms.length + f.booms.length;
            m.map.ctx.fillText(l + " total   ", x, 240)
        }
    }

    function i() {
        a(), s(), f.stopped || (f.raf = window.requestAnimationFrame(i))
    }

    function x() {
        f.gameover = !1, f.world.booms = f.booms = [], f.world.capitals = f.capitals = [], f.world.cities = f.cities = [], f.world.bases = f.bases = [], f.world.factories = f.factories = [], f.world.supplies = f.supplies = [], f.world.bombers = f.bombers = [], f.world.fighters = f.fighters = [], f.world.icbms = f.icbms = [], f.world.abms = f.abms = [], f.world.sats = f.sats = [];
        var t = [{
            x: .2 * f.world.max_x,
            y: .5 * f.world.max_y,
            z: 0,
            color: "#fc0"
        }, {
            x: .8 * f.world.max_x,
            y: .5 * f.world.max_y,
            z: 0,
            color: "#0ff"
        }];
        4 === f.capital_count && (t.push({
            x: .5 * f.world.max_x,
            y: .2 * f.world.max_y,
            z: 0,
            color: "#f00"
        }), t.push({
            x: .5 * f.world.max_x,
            y: .9 * f.world.max_y,
            z: 0,
            color: "#090"
        })), t.forEach(function(t) {
            f.capitals.push(new Capital({
                x: t.x,
                y: t.y,
                z: t.z,
                color: t.color,
                world: f.world,
                defcon: f.defcon,
                unit_rate: f.unit_rate,
                bases_max: f.bases_max,
                cities_max: f.cities_max,
                factories_max: f.factories_max,
                sats_max: f.sats_max,
                bomber_launch_max: f.bomber_launch_max,
                fighter_launch_max: f.fighter_launch_max,
                icbm_launch_max: f.icbm_launch_max,
                abm_launch_max: f.abm_launch_max,
                stock: {
                    bombers: f.stock.bombers,
                    fighters: f.stock.fighters,
                    icbms: f.stock.icbms,
                    abms: f.stock.abms
                }
            }))
        }), p = [f.supplies, f.capitals, f.cities, f.bases, f.factories, f.bombers, f.fighters, f.icbms, f.abms, f.booms, f.sats]
    }

    function o() {
        x(), f.stopped = !1, f.at = Date.now(), f.raf = window.requestAnimationFrame(i)
    }

    function l() {
        var t;
        t = "", t += '<div id="map"><canvas id="cMap"></canvas></div>', t += '<div id="elevation"><canvas id="cElevation"></canvas></div>', f.el.innerHTML = t, f.w = f.el.offsetWidth, f.h = f.el.offsetHeight, m.map = {}, m.map.wrap = document.getElementById("map"), m.map.el = document.getElementById("cMap"), m.map.ctx = m.map.el.getContext("2d"), m.map.w = m.map.wrap.offsetWidth, m.map.h = m.map.wrap.offsetHeight, m.map.el.width = m.map.w, m.map.el.height = m.map.h, m.map.scale_x = m.map.w / f.world.max_x, m.map.scale_y = m.map.h / f.world.max_y, m.map.scale = Math.min(m.map.scale_x, m.map.scale_y), m.map.offset_x = m.map.w / 2 - f.world.max_x * m.map.scale / 2, m.map.offset_y = m.map.h / 2 - f.world.max_y * m.map.scale / 2, m.elv = {}, m.elv.wrap = document.getElementById("elevation"), m.elv.el = document.getElementById("cElevation"), m.elv.ctx = m.elv.el.getContext("2d"), m.elv.w = m.elv.wrap.offsetWidth, m.elv.h = m.elv.wrap.offsetHeight, m.elv.el.width = m.elv.w, m.elv.el.height = m.elv.h, m.elv.scale_x = m.elv.w / f.world.max_x, m.elv.scale_z = m.elv.h / (m.elv.h / f.world.max_z), m.elv.scale = m.elv.scale_x, m.elv.offset_x = m.elv.w / 2 - f.world.max_x * m.elv.scale / 2, m.elv.offset_y = m.elv.h / 2 - m.elv.h / f.world.max_z * m.elv.scale / 2, m.elv.yscale = m.elv.h / f.world.max_z / m.elv.scale, o()
    }

    function c() {
        f.stopped = !0
    }

    function n() {
        f.show_meta = !f.show_meta
    }

    function r() {
        f.world.show_vectors = !f.world.show_vectors
    }

    function h() {
        f.stopped || (c(), setTimeout(l, 100))
    }
    var f = this;
    this.el = t, this.max_x = 1600, this.max_y = 700, this.max_z = 200, f.world = new World({
        max_x: f.max_x,
        max_y: f.max_y,
        max_z: f.max_z
    }), this.capital_count = e.capital_count || 2, this.defcon = e.defcon || 1, this.show_meta = !1, this.unit_rate = e.unit_rate || 0, this.units = e.unit || 0, this.bases_max = e.bases_max || 0, this.cities_max = e.cities_max || 0, this.factories_max = e.factories_max || 0, this.bomber_launch_max = e.bomber_launch_max || 0, this.fighter_launch_max = e.fighter_launch_max || 0, this.icbm_launch_max = e.icbm_launch_max || 0, this.abm_launch_max = e.abm_launch_max || 0, this.sats_max = e.sats_max || 0;
    new Worker("/public/js/workers/war_worker.js");
    this.stock = e.stock || {
        bombers: 0,
        fighters: 0,
        icbms: 0,
        abms: 0
    }, this.gameover = !1, this.raf = null, this.stopped = !1, this.at = 0;
    var m = {
        map: null,
        elevation: null
    }, d = {
            update: null,
            paint: null
        }, p = [];
    return window.onresize = h, {
        start: l,
        stop: c,
        toggleMeta: n,
        toggleVectors: r
    }
};