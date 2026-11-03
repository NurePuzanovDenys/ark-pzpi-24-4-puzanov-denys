import math
from game_objects import GameObject

# 1 ДО РЕФАКТОРИНГУ

class Projectile(GameObject):
    def __init__(self, proj_def, x, y, angle, team, damage):
        super().__init__(proj_def, x, y, angle, team)
        self.damage = damage
    def update(self, dt):
        rad = math.radians(self.angle)
        self.x += math.cos(rad) * self.defn.speed * dt
        self.y -= math.sin(rad) * self.defn.speed * dt

# 1 ПІСЛЯ РЕФАКТОРИНГУ

class Projectile:
    def __init__(self, proj_def, x, y, angle, team, damage):
        self._body = GameObject(proj_def, x, y, angle, team)
        self.damage = damage
    def update(self, dt):
        rad = math.radians(self._body.angle)
        self._body.x += math.cos(rad) * self._body.defn.speed * dt
        self._body.y -= math.sin(rad) * self._body.defn.speed * dt

    def draw(self, surface):
        self._body.draw(surface)

#2 ДО РЕФАКТОРИНГУ
class Projectile:
    def __init__(self, proj_def, x, y, angle, team, damage):
        self._body = GameObject(proj_def, x, y, angle, team)
        self.damage = damage


damage = int(weapon.ammo_def.damage * weapon.damage_mul)

bullet = Projectile(
        weapon.ammo_def,
        shooter.x,
        shooter.y,
        base_angle + a,
        shooter.team,
        damage
        )

#2 ПІСЛЯ РЕФАКТОРИНГУ
class Projectile:
    def __init__(self, shooter, weapon, angle):
        self._body = GameObject(
            weapon.ammo_def,
            shooter.x,
            shooter.y,
            angle,
            shooter.team
        )
        self.damage = int(weapon.ammo_def.damage * weapon.damage_mul)


bullet = Projectile(shooter, weapon, base_angle + a)


# 3 ДО РЕФАКТОРИНГУ
class Character(GameObject):
    def __init__(self, char_def, x, y, is_player=False, weapons=None):
        super().__init__(char_def, x, y)
        self.weapons = weapons or []
        self.active_weapon = 0 if self.weapons else None

    @property
    def weapon(self):
        if self.active_weapon is None:
            return None
        return self.weapons[self.active_weapon]

    def add_weapon(self, weapon):
        self.weapons.append(weapon)
        if self.active_weapon is None:
            self.active_weapon = 0

    def switch_weapon(self):
        if not self.weapons:
            return
        self.active_weapon = (self.active_weapon + 1) % len(self.weapons)

#3 ПІСЛЯ РЕФАКТОРИНГУ
class Character(GameObject):
    def __init__(self, char_def, x, y, is_player=False, weapons=None):
        super().__init__(char_def, x, y)
        self._weapons = list(weapons) if weapons is not None else []
        self.active_weapon = 0 if self._weapons else None

    @property
    def weapons(self):
        return tuple(self._weapons)

    @property
    def weapon(self):
        if self.active_weapon is None:
            return None
        return self._weapons[self.active_weapon]

    def add_weapon(self, weapon):
        self._weapons.append(weapon)
        if self.active_weapon is None:
            self.active_weapon = 0

    def switch_weapon(self):
        if not self._weapons:
            return
        self.active_weapon = (self.active_weapon + 1) % len(self._weapons)
